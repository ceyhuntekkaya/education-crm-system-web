"use client";

export default function MyListPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <div className="mb-24">
        <h3>Listem: {params.id}</h3>
        <p className="text-neutral-600">Liste içeriği buraya gelecek</p>
      </div>
      {/* Grid içeriği buraya eklenecek */}
      <div className="row">
        <div className="col-12">
          <div className="bg-white rounded-8 p-24 shadow-sm">
            <p className="text-center text-neutral-500">
              Liste içeriği buraya eklenecek
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
