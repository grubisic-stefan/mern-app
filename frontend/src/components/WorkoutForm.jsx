import React, { useState } from "react";

const WorkoutForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    load: 0,
    reps: 0,
  });
  const [error, setError] = useState(null);

  const handleInput = (value, type) => {
    setFormData((prev) => {
      return {
        ...prev,
        [type]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setError(null);
      console.log("added");
    }

    setFormData({
      title: "",
      load: 0,
      reps: 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="create">
      <h3>Add a New Workout</h3>
      <label>Excersize Title:</label>
      <input
        type="text"
        value={formData.title}
        onChange={(e) => handleInput(e.target.value, "title")}
      />
      <label>Load (in Kg):</label>
      <input
        type="text"
        value={formData.load}
        onChange={(e) => handleInput(e.target.value, "load")}
      />
      <label>Reps:</label>
      <input
        type="text"
        value={formData.reps}
        onChange={(e) => handleInput(e.target.value, "reps")}
      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
