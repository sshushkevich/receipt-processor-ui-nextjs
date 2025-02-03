"use client";

import axios from "axios";
import { useState } from "react";
import { ReceiptItemInput } from "./receipt-item-input";
import { Receipt, ReceiptItem } from "../lib/interfaces";

export function ReceiptForm() {
  const [Receipt, setReceipt] = useState<Receipt>({
    retailer: "",
    purchaseDate: "",
    purchaseTime: "",
    total: "",
    items: [{ shortDescription: "", price: "" }],
  });

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
  };

  const addReceiptItem = () => {
    setReceipt({
      ...Receipt,
      items: [...Receipt.items, { shortDescription: "", price: "" }],
    });
  };

  const removeReceiptItem = (index: number) => {
    const updatedItems =
      Receipt.items.length > 1 ? Receipt.items.toSpliced(index, 1) : [{ shortDescription: "", price: "" }];

    setReceipt({
      ...Receipt,
      items: updatedItems,
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
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
            <div className="max-w-md mx-auto">
              <div className="flex items-center space-x-5">
                <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                  RP
                </div>
                <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                  <h2 className="leading-relaxed">Receipt Processor</h2>
                  <p className="text-sm text-gray-500 font-normal leading-relaxed">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="flex flex-col">
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
                    />
                  </div>
                  <div className="flex flex-col">
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
                  <div className="flex flex-col">
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
                  <div className="flex flex-col">
                    <label htmlFor="total" className="leading-loose">
                      Total:
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0.01"
                      id="total"
                      name="total"
                      value={Receipt.total}
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <h3>Purchased Items</h3>
                    <div>
                      <button type="button" onClick={addReceiptItem}>
                        Add Item
                      </button>
                    </div>
                    {Receipt.items.map((item, idx) => (
                      <ReceiptItemInput
                        key={idx}
                        index={idx}
                        item={item}
                        onChange={handleReceiptItemChange}
                        onRemove={removeReceiptItem}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center space-x-4">
                <button
                  type="submit"
                  className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}