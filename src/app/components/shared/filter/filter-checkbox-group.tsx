import React from "react";

interface Option {
    label: string;
}

interface CheckboxGroupProps {
    title: string;
    options: Option[];
    selectedOptions: string[];
    onChange: (selected: string[]) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ title, options, selectedOptions, onChange }) => {
    const handleCheckboxChange = (label: string) => {
        if (selectedOptions.includes(label)) {
            onChange(selectedOptions.filter((option) => option !== label));
        } else {
            onChange([...selectedOptions, label]);
        }
    };

    return (
        <div className="mb-4">
            <h3 className="font-semibold pb-2">{title}</h3>
            <ul className="mt-2 space-y-2">
                {options.map((option, index) => (
                    <li key={index} className="flex items-center">
                        <input
                            type="checkbox"
                            className="mr-2 w-5 h-5 accent-green"
                            checked={selectedOptions?.includes(option.label)}
                            onChange={() => handleCheckboxChange(option.label)}
                        />
                        <span className="text-sm">{option.label}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CheckboxGroup;
