
export default async function Page({
    params,
}: {
    params: Promise<{ url: string}>
}) {
    const { url } = await params;
    return (
        <div>
            <h1>Dashboard</h1>
            <p>URL: {url}</p>
        </div>
    );
}