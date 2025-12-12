import { useState } from "react";
import { User, Bell, Shield, Palette, Globe, Mail, Key, Trash2, Camera, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const Settings = () => {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    company: "Acme Inc",
    role: "Admin"
  });

  const [preferences, setPreferences] = useState({
    theme: "dark",
    language: "fr",
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: false,
    executionAlerts: true
  });

  const handleSaveProfile = () => {
    toast.success("Profil mis à jour avec succès");
  };

  const handleSavePreferences = () => {
    toast.success("Préférences sauvegardées");
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Paramètres</h1>
        <p className="text-muted-foreground">Gérez votre profil et vos préférences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-card border border-border">
          <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <User className="w-4 h-4 mr-2" />
            Profil
          </TabsTrigger>
          <TabsTrigger value="preferences" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Palette className="w-4 h-4 mr-2" />
            Préférences
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Shield className="w-4 h-4 mr-2" />
            Sécurité
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Informations du profil</CardTitle>
              <CardDescription>Mettez à jour vos informations personnelles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary/20 text-primary text-xl">
                    {profile.firstName[0]}{profile.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    Changer la photo
                  </Button>
                  <p className="text-xs text-muted-foreground">JPG, PNG ou GIF. Max 2MB</p>
                </div>
              </div>

              <Separator />

              {/* Form Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    value={profile.firstName}
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    value={profile.lastName}
                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                    className="bg-background border-border"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="bg-background border-border"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Entreprise</Label>
                  <Input
                    id="company"
                    value={profile.company}
                    onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Rôle</Label>
                  <Input
                    id="role"
                    value={profile.role}
                    disabled
                    className="bg-muted border-border"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveProfile} className="bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Préférences d'affichage</CardTitle>
              <CardDescription>Personnalisez votre expérience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Thème</Label>
                  <Select
                    value={preferences.theme}
                    onValueChange={(value) => setPreferences({ ...preferences, theme: value })}
                  >
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dark">Sombre</SelectItem>
                      <SelectItem value="light">Clair</SelectItem>
                      <SelectItem value="system">Système</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Langue</Label>
                  <Select
                    value={preferences.language}
                    onValueChange={(value) => setPreferences({ ...preferences, language: value })}
                  >
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Format de date et heure</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Format de date</Label>
                    <Select defaultValue="dd/mm/yyyy">
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Fuseau horaire</Label>
                    <Select defaultValue="europe/paris">
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="europe/paris">Europe/Paris (UTC+1)</SelectItem>
                        <SelectItem value="america/new_york">America/New_York (UTC-5)</SelectItem>
                        <SelectItem value="asia/tokyo">Asia/Tokyo (UTC+9)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSavePreferences} className="bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Paramètres de notifications</CardTitle>
              <CardDescription>Configurez comment vous souhaitez être notifié</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-background border border-border">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Notifications par email</p>
                      <p className="text-sm text-muted-foreground">Recevoir les alertes par email</p>
                    </div>
                  </div>
                  <Switch
                    checked={preferences.emailNotifications}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, emailNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-background border border-border">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Notifications push</p>
                      <p className="text-sm text-muted-foreground">Notifications dans le navigateur</p>
                    </div>
                  </div>
                  <Switch
                    checked={preferences.pushNotifications}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, pushNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-background border border-border">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Résumé hebdomadaire</p>
                      <p className="text-sm text-muted-foreground">Rapport d'activité chaque semaine</p>
                    </div>
                  </div>
                  <Switch
                    checked={preferences.weeklyDigest}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, weeklyDigest: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-background border border-border">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Alertes d'exécution</p>
                      <p className="text-sm text-muted-foreground">Notifier en cas d'échec de workflow</p>
                    </div>
                  </div>
                  <Switch
                    checked={preferences.executionAlerts}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, executionAlerts: checked })}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSavePreferences} className="bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Mot de passe</CardTitle>
                <CardDescription>Changez votre mot de passe</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    placeholder="••••••••"
                    className="bg-background border-border"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="••••••••"
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmer</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      className="bg-background border-border"
                    />
                  </div>
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                  <Key className="w-4 h-4 mr-2" />
                  Changer le mot de passe
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Authentification à deux facteurs</CardTitle>
                <CardDescription>Ajoutez une couche de sécurité supplémentaire</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 rounded-lg bg-background border border-border">
                  <div>
                    <p className="font-medium text-foreground">2FA par application</p>
                    <p className="text-sm text-muted-foreground">Utiliser Google Authenticator ou similaire</p>
                  </div>
                  <Button variant="outline">Activer</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive">Zone de danger</CardTitle>
                <CardDescription>Actions irréversibles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                  <div>
                    <p className="font-medium text-foreground">Supprimer le compte</p>
                    <p className="text-sm text-muted-foreground">Cette action est irréversible</p>
                  </div>
                  <Button variant="destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Supprimer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
