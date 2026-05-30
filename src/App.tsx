import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Reader from "@/pages/Reader";
import Bookshelf from "@/pages/Bookshelf";
import Concepts from "@/pages/Concepts";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Reader />} />
          <Route path="/bookshelf" element={<Bookshelf />} />
          <Route path="/concepts" element={<Concepts />} />
        </Route>
      </Routes>
    </Router>
  );
}