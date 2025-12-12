'use client';

import { useState, useCallback, useRef } from 'react';

// Types for the workflow editor
interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'loop';
  name: string;
  position: { x: number; y: number };
  data: Record<string, unknown>;
  outputs: string[];
  inputs: string[];
}

interface WorkflowConnection {
  id: string;
  sourceNode: string;
  sourceOutput: number;
  targetNode: string;
  targetInput: number;
}

interface Workflow {
  id: string;
  name: string;
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// Available node types inspired by n8n
const NODE_TYPES = [
  { type: 'trigger', name: 'Webhook Trigger', icon: '🔔', color: '#10b981' },
  { type: 'trigger', name: 'Schedule Trigger', icon: '⏰', color: '#10b981' },
  { type: 'trigger', name: 'Manual Trigger', icon: '▶️', color: '#10b981' },
  { type: 'action', name: 'HTTP Request', icon: '🌐', color: '#3b82f6' },
  { type: 'action', name: 'Send Email', icon: '📧', color: '#3b82f6' },
  { type: 'action', name: 'Database Query', icon: '🗄️', color: '#3b82f6' },
  { type: 'action', name: 'Transform Data', icon: '🔄', color: '#3b82f6' },
  { type: 'action', name: 'AI Agent', icon: '🤖', color: '#8b5cf6' },
  { type: 'condition', name: 'IF Condition', icon: '❓', color: '#f59e0b' },
  { type: 'condition', name: 'Switch', icon: '🔀', color: '#f59e0b' },
  { type: 'loop', name: 'Loop', icon: '🔁', color: '#ec4899' },
  { type: 'action', name: 'Slack', icon: '💬', color: '#3b82f6' },
  { type: 'action', name: 'Google Sheets', icon: '📊', color: '#3b82f6' },
  { type: 'action', name: 'GitHub', icon: '🐙', color: '#3b82f6' },
];

interface WorkflowNodeComponentProps {
  node: WorkflowNode;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDrag: (id: string, position: { x: number; y: number }) => void;
  onDelete: (id: string) => void;
}

const WorkflowNodeComponent = ({ node, isSelected, onSelect, onDrag, onDelete }: WorkflowNodeComponentProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const nodeType = NODE_TYPES.find(t => t.name === node.name) || NODE_TYPES[0];

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!nodeRef.current) return;
    const rect = nodeRef.current.getBoundingClientRect();
    setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setIsDragging(true);
    onSelect(node.id);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !nodeRef.current) return;
    const parent = nodeRef.current.parentElement;
    if (!parent) return;
    const parentRect = parent.getBoundingClientRect();
    onDrag(node.id, {
      x: e.clientX - parentRect.left - dragOffset.x,
      y: e.clientY - parentRect.top - dragOffset.y
    });
  }, [isDragging, dragOffset, node.id, onDrag]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add/remove event listeners
  useState(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  });

  return (
    <div
      ref={nodeRef}
      className={`absolute flex flex-col items-center cursor-move transition-shadow ${
        isSelected ? 'z-10' : 'z-0'
      }`}
      style={{ left: node.position.x, top: node.position.y }}
      onMouseDown={handleMouseDown}
    >
      {/* Input connector */}
      {node.type !== 'trigger' && (
        <div className="w-3 h-3 bg-gray-400 rounded-full -mt-1.5 border-2 border-white shadow" />
      )}
      
      {/* Node body */}
      <div
        className={`relative flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border-2 min-w-[160px] ${
          isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
        }`}
        style={{ 
          backgroundColor: nodeType?.color + '20',
          borderColor: nodeType?.color 
        }}
      >
        <span className="text-2xl">{nodeType?.icon}</span>
        <div className="flex-1">
          <div className="font-medium text-sm text-gray-900 dark:text-white">{node.name}</div>
          <div className="text-xs text-gray-500 capitalize">{node.type}</div>
        </div>
        
        {/* Delete button */}
        {isSelected && (
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(node.id); }}
            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600"
          >
            ×
          </button>
        )}
      </div>
      
      {/* Output connector */}
      <div className="w-3 h-3 bg-gray-400 rounded-full -mb-1.5 border-2 border-white shadow" />
    </div>
  );
};

export const WorkflowEditor = () => {
  const [workflow, setWorkflow] = useState<Workflow>({
    id: 'new',
    name: 'New Workflow',
    nodes: [],
    connections: [],
    active: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [showNodePanel, setShowNodePanel] = useState(true);
  const canvasRef = useRef<HTMLDivElement>(null);

  const addNode = (nodeType: typeof NODE_TYPES[0]) => {
    const newNode: WorkflowNode = {
      id: `node-${Date.now()}`,
      type: nodeType.type as WorkflowNode['type'],
      name: nodeType.name,
      position: { x: 200 + workflow.nodes.length * 50, y: 150 + workflow.nodes.length * 30 },
      data: {},
      outputs: ['output-0'],
      inputs: nodeType.type !== 'trigger' ? ['input-0'] : [],
    };
    setWorkflow(prev => ({
      ...prev,
      nodes: [...prev.nodes, newNode],
      updatedAt: new Date().toISOString(),
    }));
  };

  const updateNodePosition = (nodeId: string, position: { x: number; y: number }) => {
    setWorkflow(prev => ({
      ...prev,
      nodes: prev.nodes.map(n => n.id === nodeId ? { ...n, position } : n),
      updatedAt: new Date().toISOString(),
    }));
  };

  const deleteNode = (nodeId: string) => {
    setWorkflow(prev => ({
      ...prev,
      nodes: prev.nodes.filter(n => n.id !== nodeId),
      connections: prev.connections.filter(c => c.sourceNode !== nodeId && c.targetNode !== nodeId),
      updatedAt: new Date().toISOString(),
    }));
    setSelectedNode(null);
  };

  const saveWorkflow = () => {
    console.log('Saving workflow:', workflow);
    // TODO: Save to database via API
    alert('Workflow saved! (Check console for data)');
  };

  const toggleActive = () => {
    setWorkflow(prev => ({
      ...prev,
      active: !prev.active,
      updatedAt: new Date().toISOString(),
    }));
  };

  return (
    <div className="flex h-[calc(100vh-200px)] bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Left Panel - Node Types */}
      {showNodePanel && (
        <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">Add Node</h3>
            <p className="text-xs text-gray-500 mt-1">Click to add to canvas</p>
          </div>
          
          <div className="p-3 space-y-2">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Triggers</div>
            {NODE_TYPES.filter(n => n.type === 'trigger').map((nodeType, i) => (
              <button
                key={i}
                onClick={() => addNode(nodeType)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
              >
                <span className="text-xl">{nodeType.icon}</span>
                <span className="text-sm text-gray-700 dark:text-gray-200">{nodeType.name}</span>
              </button>
            ))}
            
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-4 mb-2">Actions</div>
            {NODE_TYPES.filter(n => n.type === 'action').map((nodeType, i) => (
              <button
                key={i}
                onClick={() => addNode(nodeType)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
              >
                <span className="text-xl">{nodeType.icon}</span>
                <span className="text-sm text-gray-700 dark:text-gray-200">{nodeType.name}</span>
              </button>
            ))}
            
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-4 mb-2">Logic</div>
            {NODE_TYPES.filter(n => n.type === 'condition' || n.type === 'loop').map((nodeType, i) => (
              <button
                key={i}
                onClick={() => addNode(nodeType)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
              >
                <span className="text-xl">{nodeType.icon}</span>
                <span className="text-sm text-gray-700 dark:text-gray-200">{nodeType.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowNodePanel(!showNodePanel)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title={showNodePanel ? 'Hide panel' : 'Show panel'}
            >
              {showNodePanel ? '◀' : '▶'}
            </button>
            <input
              type="text"
              value={workflow.name}
              onChange={(e) => setWorkflow(prev => ({ ...prev, name: e.target.value }))}
              className="text-lg font-semibold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 text-gray-900 dark:text-white"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={toggleActive}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                workflow.active
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {workflow.active ? '● Active' : '○ Inactive'}
            </button>
            <button
              onClick={saveWorkflow}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Save Workflow
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div
          ref={canvasRef}
          className="flex-1 relative overflow-auto"
          style={{
            backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
          onClick={() => setSelectedNode(null)}
        >
          {workflow.nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Start building your workflow</h3>
                <p className="text-sm text-gray-500 mt-2">Add nodes from the left panel to get started</p>
              </div>
            </div>
          )}
          
          {workflow.nodes.map(node => (
            <WorkflowNodeComponent
              key={node.id}
              node={node}
              isSelected={selectedNode === node.id}
              onSelect={setSelectedNode}
              onDrag={updateNodePosition}
              onDelete={deleteNode}
            />
          ))}
        </div>
        
        {/* Status bar */}
        <div className="px-4 py-2 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 flex items-center justify-between">
          <span>{workflow.nodes.length} nodes • {workflow.connections.length} connections</span>
          <span>Last updated: {new Date(workflow.updatedAt).toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Right Panel - Node Properties */}
      {selectedNode && (
        <div className="w-72 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">Node Properties</h3>
          </div>
          <div className="p-4">
            {(() => {
              const node = workflow.nodes.find(n => n.id === selectedNode);
              if (!node) return null;
              const nodeType = NODE_TYPES.find(t => t.name === node.name);
              return (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{nodeType?.icon}</span>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{node.name}</div>
                      <div className="text-xs text-gray-500 capitalize">{node.type}</div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Node ID
                    </label>
                    <input
                      type="text"
                      value={node.id}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Position
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={Math.round(node.position.x)}
                        onChange={(e) => updateNodePosition(node.id, { ...node.position, x: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm"
                        placeholder="X"
                      />
                      <input
                        type="number"
                        value={Math.round(node.position.y)}
                        onChange={(e) => updateNodePosition(node.id, { ...node.position, y: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm"
                        placeholder="Y"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => deleteNode(node.id)}
                      className="w-full px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                    >
                      Delete Node
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowEditor;
