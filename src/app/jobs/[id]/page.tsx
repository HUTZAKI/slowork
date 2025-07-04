export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div>
      <h1>Job Detail Page</h1>
      <p>Job ID: {id}</p>
    </div>
  );
}