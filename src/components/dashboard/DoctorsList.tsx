// @ts-nocheck
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input"; // Assuming Input exists based on usage in other files
import { Search, MapPin, Star, Calendar, Clock, Video, Home, Info, DollarSign, Filter, CreditCard } from "lucide-react";
import { useState } from "react";

const doctors = [
    { id: 1, name: "Dr. Emily Chen", specialty: "Cardiology", rating: 4.9, reviews: 124, location: "New York, NY", image: "/avatars/01.png", available: true, price: "$150", exp: "12 years", languages: "EN, FR" },
    { id: 2, name: "Dr. James Wilson", specialty: "Neurology", rating: 4.8, reviews: 89, location: "Boston, MA", image: "/avatars/02.png", available: false, price: "$200", exp: "8 years", languages: "EN" },
    { id: 3, name: "Dr. Sarah Patel", specialty: "Pediatrics", rating: 5.0, reviews: 210, location: "Chicago, IL", image: "/avatars/03.png", available: true, price: "$120", exp: "15 years", languages: "EN, AR" },
    { id: 4, name: "Dr. Michael Ross", specialty: "Dermatology", rating: 4.7, reviews: 156, location: "Miami, FL", image: "/avatars/04.png", available: true, price: "$180", exp: "10 years", languages: "EN, ES" },
    { id: 5, name: "Dr. Lisa Wong", specialty: "General Practice", rating: 4.8, reviews: 180, location: "San Francisco, CA", image: "/avatars/05.png", available: true, price: "$100", exp: "6 years", languages: "EN, CN" },
];

export function DoctorsList({ onAction }: { onAction?: (msg: string) => void }) {
    const [selectedDoctor, setSelectedDoctor] = useState<typeof doctors[0] | null>(null);
    const [bookDate, setBookDate] = useState("");
    const [bookTime, setBookTime] = useState("");
    const [consultType, setConsultType] = useState("online");
    const [filterSpecialty, setFilterSpecialty] = useState("");
    const [filterLocation, setFilterLocation] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("card");

    const handleBook = () => {
        if (!selectedDoctor || !bookDate || !bookTime) return;
        if (onAction) {
            const paymentStatus = paymentMethod === 'card' ? 'Paid Online' : 'Pay at Clinic';
            onAction(`Appointment confirmed with ${selectedDoctor.name} on ${bookDate} at ${bookTime} (${consultType}, ${paymentStatus}). Confirmation sent via WhatsApp.`);
        }
        setSelectedDoctor(null);
    };

    const filteredDoctors = doctors.filter(doc => 
        (filterSpecialty === "" || doc.specialty.toLowerCase().includes(filterSpecialty.toLowerCase())) &&
        (filterLocation === "" || doc.location.toLowerCase().includes(filterLocation.toLowerCase()))
    );

    return (
        <div className="space-y-6 animate-in fade-in zoom-in duration-300">
             <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Find a Doctor</h1>
                        <p className="text-muted-foreground">Book appointments with top specialists.</p>
                    </div>
                </div>

                {/* Search & Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-card p-4 rounded-xl border border-border shadow-sm">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                            placeholder="Search by specialty..." 
                            className="pl-9"
                            value={filterSpecialty}
                            onChange={(e) => setFilterSpecialty(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                            placeholder="Location (e.g. New York)" 
                            className="pl-9"
                            value={filterLocation}
                            onChange={(e) => setFilterLocation(e.target.value)}
                        />
                    </div>
                     <div className="flex items-center gap-2">
                        <Button variant="outline" className="w-full gap-2">
                            <Calendar className="w-4 h-4" /> Availability
                        </Button>
                        <Button variant="outline" size="icon">
                            <Filter className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDoctors.map((doc) => (
                    <Card key={doc.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-card">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <Avatar className="w-16 h-16 border-2 border-background shadow-sm">
                                    <AvatarImage src={doc.image} />
                                    <AvatarFallback>DR</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col items-end gap-1">
                                    <Badge variant={doc.available ? "default" : "secondary"} className={doc.available ? "bg-emerald-500 hover:bg-emerald-600" : ""}>
                                        {doc.available ? "Available" : "Booked"}
                                    </Badge>
                                    <span className="text-xs font-bold text-primary">{doc.price} / visit</span>
                                </div>
                            </div>
                            
                            <h3 className="font-bold text-lg">{doc.name}</h3>
                            <p className="text-primary font-medium text-sm mb-2">{doc.specialty}</p>
                            
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    <span className="font-semibold text-foreground">{doc.rating}</span>
                                    <span>({doc.reviews})</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{doc.exp}</span>
                                </div>
                            </div>
                             <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
                                <span className="px-2 py-1 bg-muted rounded">{doc.languages}</span>
                                <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/> {doc.location}</span>
                            </div>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button 
                                        className="w-full gap-2" 
                                        variant={doc.available ? "default" : "outline"}
                                        disabled={!doc.available}
                                        onClick={() => setSelectedDoctor(doc)}
                                    >
                                        <Calendar className="w-4 h-4" />
                                        Book Appointment
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Book Appointment</DialogTitle>
                                        <DialogDescription>
                                            Book a visit with <span className="font-semibold text-foreground">{doc.name}</span>.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="date">Date</Label>
                                            <Input id="date" type="date" value={bookDate} onChange={(e) => setBookDate(e.target.value)} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="time">Time</Label>
                                            <Input id="time" type="time" value={bookTime} onChange={(e) => setBookTime(e.target.value)} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label>Consultation Type</Label>
                                            <RadioGroup defaultValue="online" onValueChange={setConsultType}>
                                                <div className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                                                    <RadioGroupItem value="online" id="online" />
                                                    <Label htmlFor="online" className="flex items-center gap-2 cursor-pointer w-full">
                                                        <Video className="w-4 h-4 text-blue-500" />
                                                        Online Consultation (Video)
                                                    </Label>
                                                </div>
                                                <div className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                                                    <RadioGroupItem value="person" id="person" />
                                                    <Label htmlFor="person" className="flex items-center gap-2 cursor-pointer w-full">
                                                        <Home className="w-4 h-4 text-green-500" />
                                                        In-Person Visit
                                                    </Label>
                                                </div>
                                            </RadioGroup>
                                        </div>

                                        <div className="grid gap-2">
                                            <Label>Payment Method</Label>
                                            <RadioGroup defaultValue="card" onValueChange={setPaymentMethod} className="grid grid-cols-2 gap-4">
                                                <div className={`flex items-center space-x-2 border p-3 rounded-lg cursor-pointer ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'}`}>
                                                    <RadioGroupItem value="card" id="card" />
                                                    <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer w-full font-normal">
                                                        <CreditCard className="w-4 h-4" /> Credit Card
                                                    </Label>
                                                </div>
                                                <div className={`flex items-center space-x-2 border p-3 rounded-lg cursor-pointer ${paymentMethod === 'clinic' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'}`}>
                                                    <RadioGroupItem value="clinic" id="clinic" />
                                                    <Label htmlFor="clinic" className="flex items-center gap-2 cursor-pointer w-full font-normal">
                                                        <DollarSign className="w-4 h-4" /> Pay at Clinic
                                                    </Label>
                                                </div>
                                            </RadioGroup>
                                        </div>

                                        {paymentMethod === 'card' && (
                                            <div className="grid gap-2 p-4 border border-border rounded-lg bg-muted/30 animate-in fade-in zoom-in slide-in-from-top-2 duration-300">
                                                <div className="grid gap-1">
                                                    <Label htmlFor="card-number" className="text-xs">Card Number</Label>
                                                    <Input id="card-number" placeholder="0000 0000 0000 0000" className="bg-background" />
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="grid gap-1">
                                                        <Label htmlFor="expiry" className="text-xs">Expiry</Label>
                                                        <Input id="expiry" placeholder="MM/YY" className="bg-background" />
                                                    </div>
                                                    <div className="grid gap-1">
                                                        <Label htmlFor="cvc" className="text-xs">CVC</Label>
                                                        <Input id="cvc" placeholder="123" className="bg-background" />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" onClick={handleBook} disabled={!bookDate || !bookTime} className="w-full">
                                            {paymentMethod === 'card' ? `Pay ${doc.price} & Confirm` : 'Confirm Booking'}
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
