import { useState, useEffect } from "react";

export default function Receptionist() {
  const storedAppointments =
    JSON.parse(localStorage.getItem("appointments")) || [];
  const [appointments, setAppointments] = useState(storedAppointments);

  const today = new Date();
  const defaultDate = today.toISOString().split("T")[0];
  const defaultTime = today.toTimeString().slice(0, 5);

  const [form, setForm] = useState({
    name: "",
    age: "",
    temp: "",
    bp: "",
    weight: "",
    doctor: "",
    number: "",
    date: defaultDate,
    time: defaultTime,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAppointment = { id: Date.now(), ...form };

    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);

    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));

    alert(`Appointment booked for ${form.name} with Dr. ${form.doctor}`);

    setForm({
      name: "",
      age: "",
      temp: "",
      bp: "",
      weight: "",
      doctor: "",
      number: "",
      date: defaultDate,
      time: defaultTime,
    });
  };

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow mt-16">
      <h2 className="text-2xl font-bold mb-4 text-blue-600 text-center">
        Book Appointment
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Patient Name"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
          placeholder="Age"
          className="w-full border p-2 rounded"
        />

        <div className="grid grid-cols-3 gap-2">
          <input
            type="text"
            name="temp"
            value={form.temp}
            onChange={handleChange}
            placeholder="Temperature"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="bp"
            value={form.bp}
            onChange={handleChange}
            placeholder="Blood Pressure"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="weight"
            value={form.weight}
            onChange={handleChange}
            placeholder="Weight"
            className="border p-2 rounded"
          />
        </div>

        <input
          type="text"
          name="doctor"
          value={form.doctor}
          onChange={handleChange}
          placeholder="Doctor Name"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="number"
          value={form.number}
          onChange={handleChange}
          placeholder="Enter Phone Number"
          className="w-full border p-2 rounded"
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
}
