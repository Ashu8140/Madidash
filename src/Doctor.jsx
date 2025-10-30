import { useState, useEffect } from "react";
import Card from "./Card";

export default function Doctor() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    doctors: 5,
    todayAppointments: 0,
    completed: 0,
  });

  const [appointments, setAppointments] = useState([]);
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    age: "",
    bp: "",
    doctor: "",
    number: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(stored);
  }, []);

  const handleDelete = (id) => {
    const updated = appointments.filter((item) => item.id !== id);
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditForm(item);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    const updated = appointments.map((item) =>
      item.id === editingId ? { ...editForm } : item
    );
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
    setEditingId(null);
  };

  const data = appointments.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6 mt-10 mx-4">
      <input
        type="text"
        placeholder="Search Patient Name"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="mb-2 mt-16 p-2 px-6 border rounded-sm"
      />

      <div className="bg-white p-5 rounded shadow">
        <h2 className="text-lg font-semibold mb-3">Today's Appointments</h2>

        {appointments.length === 0 ? (
          <p className="text-gray-500 text-sm">No appointments booked yet.</p>
        ) : (
          <>
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full border text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2">Patient</th>
                    <th className="border p-2">Doctor</th>
                    <th className="border p-2">Age</th>
                    <th className="border p-2">BP</th>
                    <th className="border p-2">Mobile</th>
                    <th className="border p-2">Date</th>
                    <th className="border p-2">Time</th>
                    <th className="border p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((a) => (
                    <tr key={a.id}>
                      <td className="border p-2">{a.name}</td>
                      <td className="border p-2">{a.doctor}</td>
                      <td className="border p-2">{a.age}</td>
                      <td className="border p-2">{a.bp}</td>
                      <td className="border p-2">{a.number}</td>
                      <td className="border p-2">{a.date}</td>
                      <td className="border p-2">{a.time}</td>
                      <td className="border p-2 text-center space-x-2">
                        <button
                          onClick={() => handleEdit(a)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(a.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="block sm:hidden space-y-3">
              {data.map((a) => (
                <div
                  key={a.id}
                  className="border rounded-lg p-3 shadow-sm bg-gray-50"
                >
                  <p>
                    <span className="font-semibold">Patient:</span> {a.name}
                  </p>
                  <p>
                    <span className="font-semibold">Doctor:</span> {a.doctor}
                  </p>
                  <p>
                    <span className="font-semibold">Age:</span> {a.age}
                  </p>
                  <p>
                    <span className="font-semibold">BP:</span> {a.bp}
                  </p>
                  <p>
                    <span className="font-semibold">Mobile:</span> {a.number}
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span> {a.date}
                  </p>
                  <p>
                    <span className="font-semibold">Time:</span> {a.time}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleEdit(a)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {editingId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-5 rounded-lg w-80 shadow-lg">
            <h3 className="text-lg font-semibold mb-3 text-blue-600">
              Edit Appointment
            </h3>
            <div className="space-y-2">
              <input
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                placeholder="Patient Name"
                className="border p-2 rounded w-full"
              />
              <input
                name="age"
                value={editForm.age}
                onChange={handleEditChange}
                placeholder="Age"
                className="border p-2 rounded w-full"
              />
              <input
                name="bp"
                value={editForm.bp}
                onChange={handleEditChange}
                placeholder="Blood Pressure"
                className="border p-2 rounded w-full"
              />
              <input
                name="doctor"
                value={editForm.doctor}
                onChange={handleEditChange}
                placeholder="Doctor Name"
                className="border p-2 rounded w-full"
              />
              <input
                name="number"
                value={editForm.number}
                onChange={handleEditChange}
                placeholder="Mobile Number"
                className="border p-2 rounded w-full"
              />
              <input
                type="date"
                name="date"
                value={editForm.date}
                onChange={handleEditChange}
                className="border p-2 rounded w-full"
              />
              <input
                type="time"
                name="time"
                value={editForm.time}
                onChange={handleEditChange}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setEditingId(null)}
                className="px-3 py-1 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
