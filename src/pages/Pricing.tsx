import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Building, Rocket, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    icon: Zap,
    price: "0",
    description: "Perfect for getting started",
    features: [
      "2 active workflows",
      "500 executions/month",
      "5 integrations",
      "7 days log retention",
      "Community support",
    ],
    cta: "Current Plan",
    popular: false,
    current: true,
  },
  {
    name: "Starter",
    icon: Rocket,
    price: "19",
    description: "For growing teams",
    features: [
      "10 active workflows",
      "5,000 executions/month",
      "15 integrations",
      "30 days log retention",
      "Email support",
      "Webhook triggers",
    ],
    cta: "Upgrade",
    popular: false,
    current: false,
  },
  {
    name: "Pro",
    icon: Crown,
    price: "49",
    description: "For professional teams",
    features: [
      "Unlimited workflows",
      "50,000 executions/month",
      "All integrations",
      "60 days log retention",
      "Priority support",
      "Advanced analytics",
      "Custom webhooks",
      "API access",
    ],
    cta: "Upgrade",
    popular: true,
    current: false,
  },
  {
    name: "Enterprise",
    icon: Building,
    price: "Custom",
    description: "For large organizations",
    features: [
      "Everything in Pro",
      "Unlimited executions",
      "90 days log retention",
      "Dedicated support",
      "SSO/SAML",
      "Custom integrations",
      "SLA guarantee",
      "On-premise option",
    ],
    cta: "Contact Sales",
    popular: false,
    current: false,
  },
];

export function Pricing() {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Choose your plan</h1>
        <p className="text-muted-foreground">
          Start free and scale as you grow. All plans include a 14-day free trial.
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <Card
              key={plan.name}
              className={cn(
                "relative",
                plan.popular && "border-primary shadow-lg scale-105"
              )}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-coral text-primary-foreground border-0">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center pb-2">
                <div className={cn(
                  "mx-auto p-3 rounded-xl w-fit mb-2",
                  plan.popular ? "gradient-coral" : "bg-muted"
                )}>
                  <Icon className={cn(
                    "h-6 w-6",
                    plan.popular ? "text-primary-foreground" : "text-muted-foreground"
                  )} />
                </div>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <span className="text-4xl font-bold">
                    {plan.price === "Custom" ? "" : "$"}{plan.price}
                  </span>
                  {plan.price !== "Custom" && (
                    <span className="text-muted-foreground">/month</span>
                  )}
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={cn(
                    "w-full",
                    plan.popular
                      ? "gradient-coral text-primary-foreground border-0"
                      : plan.current
                      ? "bg-muted text-muted-foreground"
                      : ""
                  )}
                  variant={plan.popular || plan.current ? "default" : "outline"}
                  disabled={plan.current}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* FAQ or Additional Info */}
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6 text-center">
          <h3 className="font-semibold mb-2">Need more executions?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Contact us for custom volume pricing or enterprise solutions tailored to your needs.
          </p>
          <Button variant="outline">Contact Sales</Button>
        </CardContent>
      </Card>
    </div>
  );
}
