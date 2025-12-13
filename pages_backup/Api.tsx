import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Key, 
  Copy, 
  Eye, 
  EyeOff, 
  Plus, 
  Trash2, 
  ExternalLink,
  Code,
  FileJson,
  Terminal,
  BookOpen
} from "lucide-react";
import { toast } from "sonner";

const apiKeys = [
  {
    id: "1",
    name: "Production Key",
    key: "sk_live_****************************",
    created: "2024-01-15",
    lastUsed: "2 hours ago",
    status: "active",
  },
  {
    id: "2",
    name: "Development Key",
    key: "sk_test_****************************",
    created: "2024-02-20",
    lastUsed: "5 minutes ago",
    status: "active",
  },
];

const codeExamples = {
  curl: `curl -X POST https://api.aistudio.com/v1/workflows/run \\
  -H "Authorization: Bearer sk_live_your_key" \\
  -H "Content-Type: application/json" \\
  -d '{"workflow_id": "wf_123", "data": {}}'`,
  
  javascript: `const response = await fetch('https://api.aistudio.com/v1/workflows/run', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sk_live_your_key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    workflow_id: 'wf_123',
    data: {}
  })
});`,

  python: `import requests

response = requests.post(
    'https://api.aistudio.com/v1/workflows/run',
    headers={
        'Authorization': 'Bearer sk_live_your_key',
        'Content-Type': 'application/json'
    },
    json={
        'workflow_id': 'wf_123',
        'data': {}
    }
)`,
};

export function Api() {
  const [showKey, setShowKey] = useState<string | null>(null);
  const [selectedLang, setSelectedLang] = useState("curl");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Key className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{apiKeys.length}</p>
              <p className="text-sm text-muted-foreground">Active Keys</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
              <Code className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">12,847</p>
              <p className="text-sm text-muted-foreground">API Calls (30d)</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
              <Terminal className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">v2.1</p>
              <p className="text-sm text-muted-foreground">API Version</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* API Keys */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>API Keys</CardTitle>
            <CardDescription>Manage your API keys for authentication</CardDescription>
          </div>
          <Button className="gap-2 gradient-coral text-primary-foreground border-0">
            <Plus className="h-4 w-4" />
            Create Key
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {apiKeys.map((apiKey) => (
              <div
                key={apiKey.id}
                className="flex items-center justify-between p-4 border border-border rounded-xl hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-muted">
                    <Key className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{apiKey.name}</p>
                      <Badge variant="outline" className="text-emerald-600 border-emerald-600">
                        Active
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="text-sm text-muted-foreground font-mono">
                        {showKey === apiKey.id ? apiKey.key.replace(/\*/g, "x") : apiKey.key}
                      </code>
                      <button
                        onClick={() => setShowKey(showKey === apiKey.id ? null : apiKey.id)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {showKey === apiKey.id ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={() => copyToClipboard(apiKey.key)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right text-sm text-muted-foreground hidden sm:block">
                    <p>Created: {apiKey.created}</p>
                    <p>Last used: {apiKey.lastUsed}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Code Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Start</CardTitle>
          <CardDescription>Examples to help you get started with the API</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedLang} onValueChange={setSelectedLang}>
            <TabsList>
              <TabsTrigger value="curl">cURL</TabsTrigger>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
            </TabsList>
            <TabsContent value={selectedLang} className="mt-4">
              <div className="relative">
                <pre className="p-4 bg-muted rounded-xl overflow-x-auto text-sm">
                  <code>{codeExamples[selectedLang as keyof typeof codeExamples]}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(codeExamples[selectedLang as keyof typeof codeExamples])}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Documentation Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">API Documentation</h3>
              <p className="text-sm text-muted-foreground">
                Complete reference for all endpoints
              </p>
            </div>
            <ExternalLink className="h-5 w-5 text-muted-foreground" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-900/30">
              <FileJson className="h-6 w-6 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">OpenAPI Spec</h3>
              <p className="text-sm text-muted-foreground">
                Download the OpenAPI specification
              </p>
            </div>
            <ExternalLink className="h-5 w-5 text-muted-foreground" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
