type LinkFormFieldsProps = {
  disabled: boolean;
};

export default function LinkFormFields({ disabled }: LinkFormFieldsProps) {
  return (
    <>
      <input
        type="text"
        name="title"
        placeholder="Link do Titulo"
        required
        disabled={disabled}
        className="w-full px-6 py-4 rounded-xl border border-[#E5E5E5] bg-white text-black placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <input
        type="url"
        name="url"
        placeholder="https://example.com"
        required
        disabled={disabled}
        className="w-full px-6 py-4 rounded-xl border border-[#E5E5E5] bg-white text-black placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#FFDD00] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </>
  );
}
