import React, { useEffect } from 'react';

const facultyData = [
  
  {
    name: "Dr. R. Shivakumar",
    position: "Chairman",
    image: "assets/faculties/chairman.jpg",
    details: "Chairman\nSRM Group of Institutions\nRamapuram & Trichy"
},
{
    name: "Mr. S. Niranjan",
    position: "Co-Chairman",
    image: "assets/faculties/co-chairman.jpg",
    details: "Co-Chairman\nSRM Group of Institutions\nRamapuram & Trichy"
},
{
    name: "Dr. M. Sakthi Ganesh",
    position: "Dean E&T",
    image: "assets/faculties/dean.jpg",
    details: "Dean of Engineering & Technology"
},
{
  name: "Dr. Balika J Chelliah",
  position: "Vice Principal",
  image: "assets/faculties/vp.jpg",
  details: "Vice Principal (Admin)"
},
  {
    name: "Dr. Visnu Dharshini",
    position: "Campus Life Overall Coordinator",
    image: "assets/faculties/fc1.jpg",
    details: "Department of Computer Science and Engineering"
},
{
    name: "Dr. Monika",
    position: "Campus Life Overall Coordinator",
    image: "assets/faculties/fc2.jpg",
    details: "Department of Biotechnology"
}
  // Add more faculty members...
];

const FacultySection = () => {
  useEffect(() => {
    const facultyGrid = document.querySelector('.faculty-grid');
    facultyGrid.innerHTML = '';

    facultyData.forEach((faculty) => {
      const card = document.createElement('div');
      card.className = 'person-card';
      card.innerHTML = `
        <img src="${faculty.image}" alt="${faculty.name}">
        <div class="person-info">
          <h3>${faculty.name}</h3>
          <h4>${faculty.position}</h4>
          <p>${faculty.details.replace(/\n/g, '<br>')}</p>
        </div>
      `;
      facultyGrid.appendChild(card);
    });
  }, []);

  return (
    <section id="faculty">
      <h2>Our Faculty</h2>
      <div className="faculty-grid"></div>
    </section>
  );
};

export default FacultySection;