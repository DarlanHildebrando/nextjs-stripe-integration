'use client'

export default function Sidebar() {

  return (
    <div class="flex flex-col md:flex-row gap-4 p-4">
  <div class="bg-blue-300 p-4 rounded-md w-full md:w-1/3">Coluna 1</div>
  <div class="bg-green-300 p-4 rounded-md w-full md:w-1/3">Coluna 2</div>
  <div class="bg-red-300 p-4 rounded-md w-full md:w-1/3">Coluna 3</div>
</div>
  );
}
