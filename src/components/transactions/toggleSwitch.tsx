import { FC } from 'react';

interface TogglePros {
  checked: boolean;
  onChange: () => void;
}

const ToggleSwitch: FC<TogglePros> = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) => (
  <label className='relative inline-block w-12 h-6 cursor-pointer'>
    <input
      type='checkbox'
      className='sr-only peer'
      checked={checked}
      onChange={onChange}
    />
    <div className='absolute inset-0 bg-gray-500 peer-checked:bg-blue-800 rounded-full transition-colors duration-300'></div>
    <div className='absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 transform peer-checked:translate-x-6'></div>
  </label>
);

export default ToggleSwitch;
