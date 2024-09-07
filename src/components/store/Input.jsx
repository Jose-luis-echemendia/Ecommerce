
import { useFilters } from "../../hooks/useFilters";


export const Input = ({data, inputName, value}) => {
  
  const { handleChangeFilters, filters } = useFilters()
  
  return (
    <>
      <div key={data.id} className="flex items-center h-5 mb-4">
        <input
          name={inputName}
          value={value}
          onChange={handleChangeFilters}
          type="radio"
          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full"
        />
        <label className="ml-3 min-w-0 flex-1 text-gray-500">
          {data.name}
        </label>
      </div>
    </>
  );
};
