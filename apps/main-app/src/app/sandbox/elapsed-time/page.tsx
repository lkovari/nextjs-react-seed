import ElapsedTime from "@/components/counter/ElapsedTime";

export default function Page() {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-2 text-center">Elapsed Time.</h2>
      <p className="text-center">
        ElapsedTime component with CountElapsedTimer.
      </p>
      <div className="flex justify-center mt-6">
        <ElapsedTime />
      </div>
    </>
  );
}