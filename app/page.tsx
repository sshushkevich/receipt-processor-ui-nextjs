import { ReceiptForm } from "./ui/receipt-form";

export default function Home() {
  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-center text-2xl tracking-widest py-6 uppercase">Receipt Processor</h1>
      <ReceiptForm/>
    </div>
  );
}
