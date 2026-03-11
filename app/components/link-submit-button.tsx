type LinkSubmitButtonProps = {
  allowed: boolean;
};

export default function LinkSubmitButton({ allowed }: LinkSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={!allowed}
      className="px-8 py-4 rounded-full bg-[#FFDD00] text-black font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {allowed ? "Adicionar Link" : "Limite Atingido - Faça Upgrade"}
    </button>
  );
}
