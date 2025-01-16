import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

// Helper function to format dates
const formatDate = (timestamp) => {
  if (!timestamp) return "N/A";
  try {
    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleString();
    }
    const date = new Date(timestamp);
    if (!isNaN(date)) {
      return date.toLocaleString();
    }
    return "Invalid date";
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
};

// Helper function to format date for input fields
const formatDateForInput = (timestamp) => {
  if (!timestamp) return "";
  try {
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    if (!isNaN(date)) {
      return date.toISOString().slice(0, 16);
    }
    return "";
  } catch (error) {
    console.error("Error formatting date for input:", error);
    return "";
  }
};

const EventManager = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    fee: 0,
    imageUrl: "",
    startDate: "",
    endDate: "",
    maxParticipants: 0,
    registrationDeadline: "",
    registrationRequired: false,
    sheet: "",
    slug: "",
    status: "",
    venue: "",
  });
  const [editingEvent, setEditingEvent] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Fetch events from Firestore
  const fetchEvents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "events"));
      const eventsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsData);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle input changes for new event
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle input changes for editing event
  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditingEvent((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Add a new event
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "events"), {
        ...newEvent,
        fee: parseFloat(newEvent.fee),
        maxParticipants: parseInt(newEvent.maxParticipants, 10),
        startDate: new Date(newEvent.startDate),
        endDate: new Date(newEvent.endDate),
        registrationDeadline: new Date(newEvent.registrationDeadline),
      });
      setNewEvent({
        title: "",
        description: "",
        fee: 0,
        imageUrl: "",
        startDate: "",
        endDate: "",
        maxParticipants: 0,
        registrationDeadline: "",
        registrationRequired: false,
        sheet: "",
        slug: "",
        status: "",
        venue: "",
      });
      fetchEvents();
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  // Delete an event
  const handleDelete = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteDoc(doc(db, "events", eventId));
        fetchEvents();
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  // Open edit dialog
  const handleEditClick = (event) => {
    setEditingEvent({
      ...event,
      startDate: formatDateForInput(event.startDate),
      endDate: formatDateForInput(event.endDate),
      registrationDeadline: formatDateForInput(event.registrationDeadline),
    });
    setIsEditDialogOpen(true);
  };

  // Save edited event
  const handleEditSave = async () => {
    try {
      const eventRef = doc(db, "events", editingEvent.id);
      await updateDoc(eventRef, {
        ...editingEvent,
        fee: parseFloat(editingEvent.fee),
        maxParticipants: parseInt(editingEvent.maxParticipants, 10),
        startDate: new Date(editingEvent.startDate),
        endDate: new Date(editingEvent.endDate),
        registrationDeadline: new Date(editingEvent.registrationDeadline),
      });
      setIsEditDialogOpen(false);
      setEditingEvent(null);
      fetchEvents();
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: "1rem", marginBottom: "2rem" }}
      >
        <TextField
          label="Title"
          name="title"
          value={newEvent.title}
          onChange={handleChange}
          required
        />
        <TextField
          label="Description"
          name="description"
          value={newEvent.description}
          onChange={handleChange}
          required
          multiline
          rows={3}
        />
        <TextField
          label="Fee"
          name="fee"
          type="number"
          value={newEvent.fee}
          onChange={handleChange}
          required
        />
        <TextField
          label="Image URL"
          name="imageUrl"
          value={newEvent.imageUrl}
          onChange={handleChange}
          required
        />
        <TextField
          label="Start Date"
          name="startDate"
          type="datetime-local"
          value={newEvent.startDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label="End Date"
          name="endDate"
          type="datetime-local"
          value={newEvent.endDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label="Max Participants"
          name="maxParticipants"
          type="number"
          value={newEvent.maxParticipants}
          onChange={handleChange}
          required
        />
        <TextField
          label="Registration Deadline"
          name="registrationDeadline"
          type="datetime-local"
          value={newEvent.registrationDeadline}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />
        <FormControlLabel
          control={
            <Checkbox
              name="registrationRequired"
              checked={newEvent.registrationRequired}
              onChange={handleChange}
            />
          }
          label="Registration Required"
        />
        <TextField
          label="Sheet URL"
          name="sheet"
          value={newEvent.sheet}
          onChange={handleChange}
        />
        <TextField
          label="Slug"
          name="slug"
          value={newEvent.slug}
          onChange={handleChange}
          required
        />
        <TextField
          label="Status"
          name="status"
          value={newEvent.status}
          onChange={handleChange}
          required
        />
        <TextField
          label="Venue"
          name="venue"
          value={newEvent.venue}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Add Event
        </Button>
      </form>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Fee</TableCell>
              <TableCell>Venue</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Registration Deadline</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.title}</TableCell>
                <TableCell>{event.description}</TableCell>
                <TableCell>₹{event.fee}</TableCell>
                <TableCell>{event.venue}</TableCell>
                <TableCell>{formatDate(event.startDate)}</TableCell>
                <TableCell>{formatDate(event.endDate)}</TableCell>
                <TableCell>{formatDate(event.registrationDeadline)}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(event)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(event.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          {editingEvent && (
            <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
              <TextField
                label="Title"
                name="title"
                value={editingEvent.title}
                onChange={handleEditChange}
                required
              />
              <TextField
                label="Description"
                name="description"
                value={editingEvent.description}
                onChange={handleEditChange}
                required
                multiline
                rows={3}
              />
              <TextField
                label="Fee"
                name="fee"
                type="number"
                value={editingEvent.fee}
                onChange={handleEditChange}
                required
              />
              <TextField
                label="Image URL"
                name="imageUrl"
                value={editingEvent.imageUrl}
                onChange={handleEditChange}
                required
              />
              <TextField
                label="Start Date"
                name="startDate"
                type="datetime-local"
                value={editingEvent.startDate}
                onChange={handleEditChange}
                InputLabelProps={{ shrink: true }}
                required
              />
              <TextField
                label="End Date"
                name="endDate"
                type="datetime-local"
                value={editingEvent.endDate}
                onChange={handleEditChange}
                InputLabelProps={{ shrink: true }}
                required
              />
              <TextField
                label="Max Participants"
                name="maxParticipants"
                type="number"
                value={editingEvent.maxParticipants}
                onChange={handleEditChange}
                required
              />
              <TextField
                label="Registration Deadline"
                name="registrationDeadline"
                type="datetime-local"
                value={editingEvent.registrationDeadline}
                onChange={handleEditChange}
                InputLabelProps={{ shrink: true }}
                required
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="registrationRequired"
                    checked={editingEvent.registrationRequired}
                    onChange={handleEditChange}
                  />
                }
                label="Registration Required"
              />
              <TextField
                label="Sheet URL"
                name="sheet"
                value={editingEvent.sheet}
                onChange={handleEditChange}
              />
              <TextField
                label="Slug"
                name="slug"
                value={editingEvent.slug}
                onChange={handleEditChange}
                required
              />
              <TextField
                label="Status"
                name="status"
                value={editingEvent.status}
                onChange={handleEditChange}
                required
              />
              <TextField
                label="Venue"
                name="venue"
                value={editingEvent.venue}
                onChange={handleEditChange}
                required
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EventManager;