import { ROUTES } from "@/contants/routes.constants";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex pt-20 justify-center">
      <h2>Наразі головна сторінка пуста, але ти можеш відвідати <Link href={ROUTES.QUESTIONS} className="text-blue-400 hover:text-blue-500">сторінку з питаннями</Link></h2>
    </div>
  );
}
