import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
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
} from "@mui/material";

const SlideManager = () => {
  const [slides, setSlides] = useState([]);
  const [newSlide, setNewSlide] = useState({
    title: "",
    imageUrl: "",
    order: 0,
    active: false,
  });

  const fetchSlides = async () => {
    const querySnapshot = await getDocs(collection(db, "homepageSlides"));
    const slidesData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setSlides(slidesData);
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewSlide((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "homepageSlides"), {
      ...newSlide,
      order: parseInt(newSlide.order, 10),
    });
    setNewSlide({
      title: "",
      imageUrl: "",
      order: 0,
      active: false,
    });
    fetchSlides();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "homepageSlides", id));
    fetchSlides();
  };

  const toggleActive = async (id, currentState) => {
    await updateDoc(doc(db, "homepageSlides", id), {
      active: !currentState,
    });
    fetchSlides();
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
          value={newSlide.title}
          onChange={handleChange}
          required
        />
        <TextField
          label="Image URL"
          name="imageUrl"
          value={newSlide.imageUrl}
          onChange={handleChange}
          required
        />
        <TextField
          label="Display Order"
          name="order"
          type="number"
          value={newSlide.order}
          onChange={handleChange}
          required
        />
        <FormControlLabel
          control={
            <Checkbox
              name="active"
              checked={newSlide.active}
              onChange={handleChange}
            />
          }
          label="Active"
        />
        <Button type="submit" variant="contained" color="primary">
          Add Slide
        </Button>
      </form>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Order</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slides.map((slide) => (
              <TableRow key={slide.id}>
                <TableCell>{slide.title}</TableCell>
                <TableCell>
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    style={{ width: "100px" }}
                  />
                </TableCell>
                <TableCell>{slide.order}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={slide.active}
                    onChange={() => toggleActive(slide.id, slide.active)}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(slide.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SlideManager;
