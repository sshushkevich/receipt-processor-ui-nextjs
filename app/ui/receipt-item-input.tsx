import { ReceiptItem } from "../lib/interfaces";

interface ReceiptItemInputProps {
  index: number;
  item: ReceiptItem;
  onChange: (index: number, field: keyof ReceiptItem, value: string) => void;
  onRemove: (index: number) => void;
  inputRef: React.Ref<HTMLInputElement>;
}

export function ReceiptItemInput({ index, item, onChange, onRemove, inputRef }: ReceiptItemInputProps) {
  return (
    <div key={index} className="grid grid-cols-10 gap-4 my-2">
      <div className="col-span-6">
        <label htmlFor={`shortDescription${index}`} className="leading-loose">
          Short Description
        </label>
        <input
          id={`shortDescription${index}`}
          ref={inputRef}
          type="text"
          name="shortDescription"
          value={item.shortDescription}
          className="border-gray-300 px-4 py-2 border  w-full rounded-md text-gray-600 sm:text-sm focus:ring-gray-500 focus:border-gray-900 focus:outline-none"
          onChange={(e) => onChange(index, "shortDescription", e.target.value)}
          required
        />
      </div>

      <div className="col-span-3">
        <label htmlFor={`price${index}`} className="leading-loose">
          Price
        </label>
        <div className="flex flex-wrap relative">
          <div className="flex bg-gray-100">
            <span className="border-gray-300 px-4 pb-1 pt-2 leading-normal bg-grey-lighter rounded rounded-r-none border border-r-0  whitespace-no-wrap text-grey-dark text-sm">
              $
            </span>
          </div>
          <input
            id={`price${index}`}
            type="number"
            step="0.01"
            min="0.01"
            name="price"
            value={item.price}
            className="border-gray-300 px-4 py-2 flex-shrink flex-grow leading-normal w-px rounded rounded-l-none border relative text-gray-600 sm:text-sm focus:ring-gray-500 focus:border-gray-900 focus:outline-none"
            onChange={(e) => onChange(index, "price", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex items-end">
        <button
          type="button"
          className="flex justify-center pb-2 w-full text-red-800 rounded-md focus:outline-none"
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
        </button>
      </div>
    </div>
  );
}
