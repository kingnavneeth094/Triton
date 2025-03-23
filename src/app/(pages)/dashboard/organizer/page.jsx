"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { CalendarIcon, PlusCircle, Users } from "lucide-react";
import { useSession, signOut, signIn } from "next-auth/react";

export default function OrganizerDashboard() {
  const { data: session } = useSession();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showParticipants, setShowParticipants] = useState(false);

  // room locations available
  const roomLocations = ["Room 1", "Room 2", "Room 3", "Room 4"];

  // Mock data for demonstration
  const [events, setEvents] = useState([]);

  // Fetch events from backend
  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/get-event-request");
      const data = await response.json();

      if (response.ok && data.event) {
        // If we get a single event, convert it to an array
        setEvents([data.event]);
      } else if (response.status === 404 && data.error === "No events found") {
        // Handle the case when no events are found
        setEvents([]);
        console.log("No events found for this organizer");
      } else {
        console.error("Failed to fetch events:", data.error);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Fetch events when component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john@example.com",
    role: "organizer",
    college: "Tech University",
    numberOfRooms: 3,
    picture: "",
    descriptions: "Experienced event organizer with 5+ years in the industry",
  };

  // Mock participants data
  const mockParticipants = [
    {
      name: "Alice Johnson",
      email: "alice@example.com",
      registeredAt: new Date("2023-05-10"),
      pricePaid: 25.0,
    },
    {
      name: "Bob Smith",
      email: "bob@example.com",
      registeredAt: new Date("2023-05-11"),
      pricePaid: 25.0,
    },
    {
      name: "Carol Williams",
      email: "carol@example.com",
      registeredAt: new Date("2023-05-12"),
      pricePaid: 25.0,
    },
  ];

  // Function to determine if form should be disabled based on event status
  const isFormDisabled = (status) => {
    return status === "pending" || status === "accepted";
  };

  // Function to determine if action button should be enabled based on event status
  const isActionEnabled = (status) => {
    return status === "accepted";
  };

  // Function to handle view button click
  const handleViewClick = (event) => {
    setSelectedEvent(event);
    if (event.status === "accepted") {
      setShowParticipants(true);
    }
  };

  // Check if user has organizer role

    if (session && session.user && session.user.role !== "organizer") {
      // If not an organizer, show restricted message
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
          <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center text-red-600">
              Access Restricted
            </h1>
            <p className="text-center text-gray-600">
              This dashboard is only available to organizers. Please sign in
              with an organizer account.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => signIn()}
                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Sign In
              </button>
            </div>
          </div>
        </div>
      );
    }


  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <p>No user found</p>
        <button
          onClick={() => signIn()}
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <p>Signed in as {JSON.stringify(session)}</p>
      <button className="bg-green-400" onClick={() => signOut()}>
        Sign out
      </button>
      <h1 className="text-3xl font-bold mb-6">Organizer Dashboard</h1>

      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Events</CardTitle>
            <CardDescription>Your created events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{events.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Participants</CardTitle>
            <CardDescription>Across all events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {events.reduce((sum, event) => sum + event.totalParticipants, 0)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Available Rooms</CardTitle>
            <CardDescription>For event hosting</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{user.numberOfRooms}</div>
          </CardContent>
        </Card>
      </div> */}

      <Tabs defaultValue="events" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="events">My Events</TabsTrigger>
          <TabsTrigger
            value="create"
            disabled={events.some(
              (event) =>
                event.status === "pending" || event.status === "accepted"
            )}>
            Create Event
          </TabsTrigger>
          {/* <TabsTrigger value="profile">Profile</TabsTrigger> */}
        </TabsList>

        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>My Events</CardTitle>
              <CardDescription>Manage your created events</CardDescription>
            </CardHeader>
            <CardContent>
              {events.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-500">
                    No events found. Create your first event!
                  </p>
                  <Button className="mt-2" onClick={() => fetchEvents()}>
                    Refresh Events
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Participants</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.map((event) => (
                      <TableRow key={event._id}>
                        <TableCell className="font-medium">
                          {event.title}
                        </TableCell>
                        <TableCell>{event.RoomLocation}</TableCell>
                        <TableCell>
                          {format(new Date(event.startDate), "MMM dd, yyyy")}
                          {new Date(event.startDate).toDateString() !==
                            new Date(event.endDate).toDateString() &&
                            ` - ${format(
                              new Date(event.endDate),
                              "MMM dd, yyyy"
                            )}`}
                        </TableCell>
                        <TableCell>
                          {event.totalParticipants || 0}/
                          {event.maxParticipants || "∞"}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              event.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : event.status === "accepted"
                                ? "bg-green-100 text-green-800"
                                : event.status === "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                            }>
                            {event.status
                              ? event.status.charAt(0).toUpperCase() +
                                event.status.slice(1)
                              : "Not Applied"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={!isActionEnabled(event.status)}
                            onClick={() => handleViewClick(event)}>
                            {event.status === "accepted" ? (
                              <Users className="mr-2 h-4 w-4" />
                            ) : null}
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create New Event</CardTitle>
              <CardDescription>
                Fill in the details to create a new event
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                className="space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const data = Object.fromEntries(formData.entries());

                  // Add date values that aren't captured by form entries
                  data.startDate = startDate;
                  data.endDate = endDate;

                  try {
                    const response = await fetch("/api/submit-event-request", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(data),
                    });

                    if (response.ok) {
                      const result = await response.json();
                      alert("Event created successfully!");
                      console.log("Event created:", result);

                      // Reload the page after successful event creation
                      window.location.reload();
                    } else {
                      const error = await response.json();
                      alert(`Failed to create event: ${error.error}`);
                    }
                  } catch (error) {
                    console.error("Error submitting event:", error);
                    alert("An error occurred while creating the event");
                  }
                }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Enter event title"
                      disabled={
                        selectedEvent && isFormDisabled(selectedEvent.status)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="Enter event location"
                      disabled={
                        selectedEvent && isFormDisabled(selectedEvent.status)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter event description"
                    rows={4}
                    disabled={
                      selectedEvent && isFormDisabled(selectedEvent.status)
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstPrice">First Prize</Label>
                    <Input
                      id="firstPrice"
                      name="firstPrice"
                      type="number"
                      placeholder="0.00"
                      disabled={
                        selectedEvent && isFormDisabled(selectedEvent.status)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secondPrice">Second Prize</Label>
                    <Input
                      id="secondPrice"
                      name="secondPrice"
                      type="number"
                      placeholder="0.00"
                      disabled={
                        selectedEvent && isFormDisabled(selectedEvent.status)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="thirdPrice">Third Prize</Label>
                    <Input
                      id="thirdPrice"
                      name="thirdPrice"
                      type="number"
                      placeholder="0.00"
                      disabled={
                        selectedEvent && isFormDisabled(selectedEvent.status)
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                          disabled={
                            selectedEvent &&
                            isFormDisabled(selectedEvent.status)
                          }>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                          disabled={
                            selectedEvent &&
                            isFormDisabled(selectedEvent.status)
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                          disabled={
                            selectedEvent &&
                            isFormDisabled(selectedEvent.status)
                          }>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                          disabled={
                            selectedEvent &&
                            isFormDisabled(selectedEvent.status)
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxParticipants">Maximum Participants</Label>
                  <Input
                    id="maxParticipants"
                    name="maxParticipants"
                    type="number"
                    placeholder="Enter maximum number of participants"
                    disabled={
                      selectedEvent && isFormDisabled(selectedEvent.status)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prefferedLocation1">
                    Preferred Location 1
                  </Label>
                  <select
                    id="prefferedLocation1"
                    name="prefferedLocation1"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={
                      selectedEvent && isFormDisabled(selectedEvent.status)
                    }>
                    <option value="">Select a location</option>
                    {roomLocations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prefferedLocation2">
                    Preferred Location 2
                  </Label>
                  <select
                    id="prefferedLocation2"
                    name="prefferedLocation2"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={
                      selectedEvent && isFormDisabled(selectedEvent.status)
                    }>
                    <option value="">Select a location</option>
                    {roomLocations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={
                    selectedEvent && isFormDisabled(selectedEvent.status)
                  }>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Event
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Organizer Profile</CardTitle>
              <CardDescription>Manage your profile information</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue={user.name} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue={user.email} disabled />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="college">College/Institution</Label>
                    <Input id="college" defaultValue={user.college} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rooms">Number of Rooms</Label>
                    <Input
                      id="rooms"
                      type="number"
                      defaultValue={user.numberOfRooms}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    defaultValue={user.descriptions}
                    rows={4}
                  />
                </div>

                <Button type="submit">Update Profile</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Participants Dialog */}
      <Dialog open={showParticipants} onOpenChange={setShowParticipants}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Event Participants</DialogTitle>
            <DialogDescription>
              {selectedEvent ? selectedEvent.title : "Event"} - Registered
              Participants
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Registered On</TableHead>
                  <TableHead>Payment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockParticipants.map((participant, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {participant.name}
                    </TableCell>
                    <TableCell>{participant.email}</TableCell>
                    <TableCell>
                      {format(
                        new Date(participant.registeredAt),
                        "MMM dd, yyyy"
                      )}
                    </TableCell>
                    <TableCell>${participant.pricePaid.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
