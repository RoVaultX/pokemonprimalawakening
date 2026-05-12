import { Navigate, Route, Routes } from "react-router-dom";
import { SiteLayout } from "./layout/SiteLayout";
import { HomePage } from "./pages/HomePage";
import { JoinPage } from "./pages/JoinPage";
import { FaqPage } from "./pages/FaqPage";
import { AboutPage } from "./pages/AboutPage";
import ShopPage from "./shop/ShopPage";
import AdminPage from "./shop/AdminPage";
import ThankYouPage from "./shop/ThankYouPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SiteLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<HomePage />} />
        <Route path="join" element={<JoinPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="shop" element={<ShopPage />} />
      </Route>
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/thank-you" element={<ThankYouPage />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
