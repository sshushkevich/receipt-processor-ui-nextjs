import { ReceiptItem } from "../lib/interfaces";

interface ReceiptItemInputProps {
  index: number;
  item: ReceiptItem;
  onChange: (index: number, field: keyof ReceiptItem, value: string) => void;
  onRemove: (index: number) => void;
}

export function ReceiptItemInput({ index, item, onChange, onRemove }: ReceiptItemInputProps) {
  return (
    <div key={index}>
      <div className="flex flex-col">
        <label htmlFor={`shortDescription${index}`} className="leading-loose">
          Short Description
        </label>
        <input
          id={`shortDescription${index}`}
          type="text"
          name="shortDescription"
          value={item.shortDescription}
          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
          onChange={(e) => onChange(index, "shortDescription", e.target.value)}
        />
      </div>
      <div>
        <label htmlFor={`price${index}`} className="leading-loose">
          Price
        </label>
        <input
          id={`price${index}`}
          type="number"
          step="0.01"
          min="0.01"
          name="price"
          value={item.price}
          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
          onChange={(e) => onChange(index, "price", e.target.value)}
        />
      </div>
      <div>
        <button
          type="button"
          className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none"
          onClick={() => onRemove(index)}
        >
          <svg
            className="w-6 h-6 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          Remove Item
        </button>
      </div>
    </div>
  );
}
