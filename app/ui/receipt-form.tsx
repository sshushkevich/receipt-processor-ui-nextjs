"use client";

import axios from "axios";
import { useRef, useState } from "react";
import { ReceiptItemInput } from "./receipt-item-input";
import { Receipt, ReceiptItem } from "../lib/interfaces";

export function ReceiptForm() {
  const [Receipt, setReceipt] = useState<Receipt>({
    retailer: "",
    purchaseDate: "",
    purchaseTime: "",
    total: "0",
    items: [{ shortDescription: "", price: "" }],
  });

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReceipt({
      ...Receipt,
      [name]: value,
    });
  };

  const handleReceiptItemChange = (index: number, field: keyof ReceiptItem, value: string) => {
    const updatedItems = [...Receipt.items];
    updatedItems[index][field] = value;
    setReceipt({
      ...Receipt,
      items: updatedItems,
    });
    updateTotal();
  };

  const addReceiptItem = () => {
    setReceipt({
      ...Receipt,
      items: [...Receipt.items, { shortDescription: "", price: "" }],
    });

    setTimeout(() => {
      if (inputRefs.current[Receipt.items.length]) {
        inputRefs.current[Receipt.items.length]?.focus();
      }
    }, 0);
  };

  const removeReceiptItem = (index: number) => {
    const updatedItems =
      Receipt.items.length > 1 ? Receipt.items.toSpliced(index, 1) : [{ shortDescription: "", price: "" }];
    setReceipt({
      ...Receipt,
      items: updatedItems,
    });
    updateTotal();
  };

  const updateTotal = () => {
    setReceipt((prevState) => {
      const totalAmount = prevState.items.reduce((sum, item) => {
        return sum + (parseFloat(item.price) || 0);
      }, 0);

      return {
        ...prevState,
        total: totalAmount.toFixed(2),
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit form: ");
    try {
      const resp = await axios.post("http://localhost:3001/receipts/process", Receipt);
    } catch (error) {
      console.log(`error: ${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="sm:max-w-xl sm:mx-auto">
        <div className="bg-white font-ocr px-6 py-10 text-gray-700 shadow">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label htmlFor="retailer" className="leading-loose">
                Retailer:
              </label>
              <input
                type="text"
                id="retailer"
                name="retailer"
                placeholder="e.g. Target"
                value={Receipt.retailer}
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                onChange={handleChange}
                autoFocus
              />
            </div>

            <div className="">
              <label htmlFor="purchaseDate" className="leading-loose">
                Purchase Date:
              </label>
              <input
                type="text"
                id="purchaseDate"
                name="purchaseDate"
                value={Receipt.purchaseDate}
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <label htmlFor="purchaseTime" className="leading-loose">
                Purchase Time:
              </label>
              <input
                type="text"
                id="purchaseTime"
                name="purchaseTime"
                value={Receipt.purchaseTime}
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="border-t border-dashed border-gray-300 my-10"></div>

          <div>
            <h3 className="text-center uppercase pb-4">Purchased Items:</h3>

            {Receipt.items.map((item, idx) => (
              <ReceiptItemInput
                key={idx}
                index={idx}
                item={item}
                onChange={handleReceiptItemChange}
                onRemove={removeReceiptItem}
                inputRef={(el: HTMLInputElement | null) => (inputRefs.current[idx] = el)}
              />
            ))}

            <div className="pt-4">
              <button type="button" className="text-green-800" onClick={addReceiptItem}>
                + Add Item
              </button>
            </div>
          </div>

          <div className="border-t border-dashed border-gray-300 my-10"></div>

          <div className="text-right">
            <span className="leading-loose">Total: ${Receipt.total}</span>
          </div>
        </div>
      </div>

      <div className="py-6 flex justify-center">
        <button type="submit" className="bg-blue-500 text-white px-4 py-3 rounded-md">
          Submit Receipt
        </button>
      </div>
    </form>
  );
}
