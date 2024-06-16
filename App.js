import Layout from "./src/layout/layout";
import AuthProvider from "./src/lib/AuthProvider";

export default function App() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>


  );
}
