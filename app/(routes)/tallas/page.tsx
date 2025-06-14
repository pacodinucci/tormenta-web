import { TallasComponent } from "@/components/TallasComponent";

const TallasPage = () => {
  return (
    <div
      style={{ backgroundImage: "url(/manchas_invertida.png)" }}
      className="bg-no-repeat bg-cover bg-center min-h-screen"
    >
      <TallasComponent />
    </div>
  );
};

export default TallasPage;
