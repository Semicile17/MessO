import { useState } from "react";

export default function LoginPage() {
  const [role, setRole] = useState("student"); // Role state
  const [idOrEmailOrPhone, setIdOrEmailOrPhone] = useState(""); // Input for ID, email, or phone
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Your submission logic here
  };

  const handleIdChange = (e) => {
    const value = e.target.value;
    // Allow only non-negative numbers
    if (/^\d*$/.test(value)) {
      setIdOrEmailOrPhone(value);
    }
  };

  return (
    <div className="mt-16 flex flex-col w-full h-screen items-center">
      <h1 className="text-2xl font-bold font-serif p-5">LOGIN</h1>
      <select
        name="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border border-black p-1 m-1"
      >
        <option value="student">Student</option>
        <option value="warden">Warden</option>
        <option value="caretaker">Caretaker</option>
      </select>

      {role === "student" && (
        <input
          name="id"
          type="number"
          value={idOrEmailOrPhone}
          placeholder="Enter ID number"
          onChange={handleIdChange}
          className="border border-black p-1 m-1"
          min="0" // Prevent entering negative numbers in most browsers
        />
      )}

      {role === "warden" && (
        <input
          name="email"
          type="email"
          value={idOrEmailOrPhone}
          placeholder="Enter Email"
          onChange={(e) => setIdOrEmailOrPhone(e.target.value)}
          className="border border-black p-1 m-1"
        />
      )}

      {role === "caretaker" && (
        <input
          name="phone"
          type="tel"
          value={idOrEmailOrPhone}
          placeholder="Enter Phone Number"
          onChange={(e) => setIdOrEmailOrPhone(e.target.value)}
          className="border border-black p-1 m-1"
        />
      )}

      <input
        name="password"
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-black p-1 m-1"
      />

      <button
        type="button"
        className="hover:text-blue-500"
        onClick={handleSubmit}
      >
        Login
      </button>
    </div>
  );
}
