import { useState } from "react";
import { IntegrationCard } from "@/components/integrations/IntegrationCard";
import { IntegrationFilters } from "@/components/integrations/IntegrationFilters";
import { toast } from "sonner";

const integrations = [
  {
    id: "1",
    name: "Slack",
    slug: "slack",
    description: "Send messages, manage channels, and automate your team communication.",
    logo: "💬",
    color: "#4A154B",
    category: "communication",
    rating: 4.8,
    installCount: 15420,
    isPremium: false,
    isConnected: true,
    actions: ["send_message", "list_channels", "create_channel", "invite_user"],
  },
  {
    id: "2",
    name: "Gmail",
    slug: "gmail",
    description: "Send emails, read inbox, and manage your email automation workflows.",
    logo: "📧",
    color: "#EA4335",
    category: "productivity",
    rating: 4.7,
    installCount: 12350,
    isPremium: false,
    isConnected: true,
    actions: ["send_email", "get_messages", "create_label", "search_emails"],
  },
  {
    id: "3",
    name: "Google Sheets",
    slug: "google-sheets",
    description: "Read, write, and manage spreadsheet data for powerful data workflows.",
    logo: "📊",
    color: "#0F9D58",
    category: "productivity",
    rating: 4.9,
    installCount: 18920,
    isPremium: false,
    isConnected: false,
    actions: ["append_row", "get_values", "update_row", "create_sheet"],
  },
  {
    id: "4",
    name: "Jira",
    slug: "jira",
    description: "Create issues, update tickets, and integrate with your development workflow.",
    logo: "🎫",
    color: "#0052CC",
    category: "development",
    rating: 4.5,
    installCount: 9840,
    isPremium: true,
    isConnected: false,
    actions: ["create_issue", "update_issue", "get_issue", "add_comment"],
  },
  {
    id: "5",
    name: "GitHub",
    slug: "github",
    description: "Manage repositories, issues, pull requests, and automate your CI/CD.",
    logo: "🐙",
    color: "#24292E",
    category: "development",
    rating: 4.9,
    installCount: 22100,
    isPremium: false,
    isConnected: true,
    actions: ["create_issue", "create_pr", "get_repo", "list_commits"],
  },
  {
    id: "6",
    name: "Notion",
    slug: "notion",
    description: "Create pages, manage databases, and sync your knowledge base.",
    logo: "📝",
    color: "#000000",
    category: "productivity",
    rating: 4.8,
    installCount: 14200,
    isPremium: false,
    isConnected: false,
    actions: ["create_page", "update_page", "query_database", "create_database"],
  },
  {
    id: "7",
    name: "Stripe",
    slug: "stripe",
    description: "Process payments, manage subscriptions, and handle billing automation.",
    logo: "💳",
    color: "#635BFF",
    category: "crm",
    rating: 4.9,
    installCount: 16800,
    isPremium: true,
    isConnected: false,
    actions: ["create_payment", "get_customer", "create_subscription", "refund"],
  },
  {
    id: "8",
    name: "OpenAI",
    slug: "openai",
    description: "Generate text, analyze content, and build AI-powered automations.",
    logo: "🤖",
    color: "#10A37F",
    category: "ai",
    rating: 4.9,
    installCount: 25600,
    isPremium: true,
    isConnected: false,
    actions: ["chat_completion", "generate_image", "create_embedding", "analyze"],
  },
  {
    id: "9",
    name: "HTTP / API",
    slug: "http",
    description: "Make custom HTTP requests to any API endpoint with full flexibility.",
    logo: "🌐",
    color: "#FF6B6B",
    category: "development",
    rating: 4.6,
    installCount: 31000,
    isPremium: false,
    isConnected: true,
    actions: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  },
];

export function Integrations() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filteredIntegrations = integrations.filter((integration) => {
    const matchesSearch =
      integration.name.toLowerCase().includes(search.toLowerCase()) ||
      integration.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || integration.category === category;
    return matchesSearch && matchesCategory;
  });

  const handleConnect = (name: string) => {
    toast.success(`Connecting to ${name}...`, {
      description: "Opening OAuth authorization window.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats bar */}
      <div className="flex items-center gap-6 text-sm">
        <div>
          <span className="text-muted-foreground">Available: </span>
          <span className="font-semibold text-foreground">{integrations.length} apps</span>
        </div>
        <div>
          <span className="text-muted-foreground">Connected: </span>
          <span className="font-semibold text-emerald-600">
            {integrations.filter((i) => i.isConnected).length}
          </span>
        </div>
        <div>
          <span className="text-muted-foreground">Premium: </span>
          <span className="font-semibold text-amber-600">
            {integrations.filter((i) => i.isPremium).length}
          </span>
        </div>
      </div>

      {/* Filters */}
      <IntegrationFilters
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        view={view}
        onViewChange={setView}
      />

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIntegrations.map((integration) => (
          <IntegrationCard
            key={integration.id}
            integration={integration}
            onConnect={() => handleConnect(integration.name)}
            onView={() => toast.info(`Viewing ${integration.name} details`)}
          />
        ))}
      </div>

      {filteredIntegrations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No integrations found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
