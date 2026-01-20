export default function PageHero({ title, subtitle }) {
  return (
    <section className="bg-gradient-to-r from-green-700 to-green-500 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
        <p className="mt-3 text-lg opacity-90">{subtitle}</p>
      </div>
    </section>
  );
}
