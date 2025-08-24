import { useLocation,Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  return (
    <div className="p-6 text-center">
      <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-gray-600">No match for <code>{location.pathname}</code></p>
      <Link to="/" className="text-blue-600 hover:underline">Go Home</Link>
    </div>
  );
};
export default NotFound