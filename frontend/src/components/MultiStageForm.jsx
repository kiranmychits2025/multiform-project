import React, { useState, useEffect } from "react";

const MultiStageForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    district: "",
    addressline1: "",
    addressline2: "",
    pincode: "",
    aadhar: null,
    pan: null,
    termsAccepted: false,
  });
  const [allForms, setAllForms] = useState([]);
  const [editId, setEditId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/form");
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setAllForms(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, termsAccepted: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        // Separate Update Handling: Send Files if Changed, Otherwise Send JSON
        const updatedData = { ...formData };
        if (!formData.aadhar || typeof formData.aadhar === "string")
          delete updatedData.aadhar;
        if (!formData.pan || typeof formData.pan === "string")
          delete updatedData.pan;

        const response = await fetch(
          `http://localhost:5000/api/form/${editId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
          }
        );

        if (!response.ok) throw new Error("Error updating form");
        alert("Form updated successfully!");
      } else {
        // Create New Entry
        const formDataObj = new FormData();
        Object.keys(formData).forEach((key) => {
          formDataObj.append(key, formData[key]);
        });

        const response = await fetch("http://localhost:5000/api/form", {
          method: "POST",
          body: formDataObj,
        });

        if (!response.ok) throw new Error("Error submitting form");
        alert("Form submitted successfully!");
      }

      fetchData();
      setEditId(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        state: "",
        district: "",
        addressline1: "",
        addressline2: "",
        pincode: "",
        aadhar: null,
        pan: null,
        termsAccepted: false,
      });
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const openForm = (form = null) => {
    if (form) {
      setEditId(form._id);
      setFormData({ ...form, termsAccepted: form.termsAccepted || false });
    } else {
      setEditId(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        state: "",
        district: "",
        addressline1: "",
        addressline2: "",
        pincode: "",
        aadhar: null,
        pan: null,
        termsAccepted: false,
      });
    }
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const handleEdit = (form) => {
    setEditId(form._id);
    setFormData({ ...form, termsAccepted: form.termsAccepted || false });
    setStep(1);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/form/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Error deleting");
        alert("Deleted successfully!");
        fetchData();
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };

  //Search Functionality
  const filteredForms = allForms.filter(
    (form) =>
      form.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center space-y-8   ">
      <h2 className="text-3xl font-bold mb-4 text-center">Multi Stage Form</h2>

      <button
        className="bg-green-500 text-white p-2 rounded-md font-bold"
        onClick={() => openForm()}
      >
        Add New Entry
      </button>
       
      {isFormOpen && (
        <div className="w-1/2 bg-gray p-6 shadow-md rounded-xl border">
          <button
            className="absolute top-2 right-2 text-gray-500 text-xl"
            onClick={closeForm}
          >
            ❌
          </button>
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <>
                <input
                  className="w-full p-2 border rounded-md"
                  name="name"
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  className="w-full p-2 border rounded-md"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  className="w-full p-2 border rounded-md"
                  name="phone"
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <input
                  className="w-full p-2 border rounded-md"
                  name="state"
                  type="text"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
                <input
                  className="w-full p-2 border rounded-md"
                  name="district"
                  type="text"
                  placeholder="District"
                  value={formData.district}
                  onChange={handleChange}
                  required
                />
                <input
                  className="w-full p-2 border rounded-md"
                  name="addressline1"
                  type="text"
                  placeholder="Address Line 1"
                  value={formData.addressline1}
                  onChange={handleChange}
                  required
                />
                <input
                  className="w-full p-2 border rounded-md"
                  name="addressline2"
                  type="text"
                  placeholder="Address Line 2"
                  value={formData.addressline2}
                  onChange={handleChange}
                />
                <input
                  className="w-full p-2 border rounded-md"
                  name="pincode"
                  type="text"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />

                {/* Update Button Above Next */}
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white p-2 rounded-md"
                >
                  {editId ? "Update" : "Submit"}
                </button>

                {/* Next Button */}
                <button
                  className="w-full bg-blue-500 text-white p-2 rounded-md"
                  type="button"
                  onClick={() => setStep(2)}
                >
                  Next
                </button>
              </>
            )}

            {step === 2 && (
              <>
                {/* Back Button (Top Left Corner) */}
                <button
                  className="absolute top-4 left-4 bg-gray-500 text-white p-2 rounded-md"
                  type="button"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <label className="w-full font-bold rounded-md mt-12 bg-white-200 text-center cursor-pointer">
                  Choose Aadhar Document
                </label>
                <input
                  className="w-full p-2 border rounded-md"
                  name="aadhar"
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleFileChange}
                  required
                />

                <label className="w-full font-bold rounded-md mt-12 bg-white-200 text-center cursor-pointer">
                  Choose Pan Document
                </label>
                <input
                  className="w-full p-2 border rounded-md"
                  name="pan"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  required
                />

                <label>
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleCheckboxChange}
                    required
                  />{" "}
                  I accept terms & conditions
                </label>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white p-2 rounded-md"
                >
                  {editId ? "Update" : "Submit"}
                </button>
              </>
            )}
          </form>
        </div>
      )}

      {/* Fetch Button */}
      <button
        className="bg-blue-500 text-white p-2 rounded-md flex flex-col items-center space-y-6"
        onClick={fetchData}
      >
        Fetch All Data
      </button>

      {/* Search Input */}
      <input
        className="p-2 border rounded-md mb-4"
        type="text"
        placeholder="Search by Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Data Table */}
      <div className="w-full max-w-4xl bg-white p-4 shadow-md rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">All Form Entries</h2>
        <table
          border="1"
          className="w-full  border-collapse border border-gray-300"
        >
          <thead className="bg-white p-4 shadow-md rounded-xl">
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">State</th>
              <th className="border p-2">District</th>
              <th className="border p-2">Address Line 1</th>
              <th className="border p-2">Address Line 2</th>
              <th className="border p-2">Pincode</th>
              <th className="border p-2">Aadhar</th>
              <th className="border p-2">Pan</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white p-4 shadow-md rounded-xl">
            {filteredForms.map((form) => (
              <tr key={form._id}>
                <td className="border p-2">{form.name}</td>
                <td className="border p-2">{form.email}</td>
                <td className="border p-2">{form.phone}</td>
                <td className="border p-2">{form.state}</td>
                <td className="border p-2">{form.district}</td>
                <td className="border p-2">{form.addressline1}</td>
                <td className="border p-2">{form.addressline2}</td>
                <td className="border p-2">{form.pincode}</td>
                <td className="border p-2">
                  <img
                    src={`http://localhost:5000/${form.aadhar}`}
                    alt="Aadhar"
                    width="100"
                  />
                </td>
                <td className="border p-2">
                  <img
                    src={`http://localhost:5000/${form.pan}`}
                    alt="PAN"
                    width="100"
                  />
                </td>
                <td className="border p-2">
                  <button
                    className="bg-green-500 text-white p-2 rounded-md mr-2 border-4"
                    onClick={() => {
                        openForm(), handleEdit(form);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded-md"
                    onClick={() => handleDelete(form._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MultiStageForm;
