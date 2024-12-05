// pages/event/create.tsx
import { useForm } from "react-hook-form";
import api from "@/utils/api";
import { useRouter } from "next/router";

interface EventFormInputs {
  title: string;
  description: string;
  date: string;
}

const CreateEvent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<EventFormInputs>();
  const router = useRouter();

  const onSubmit = async (data: EventFormInputs) => {
    try {
      await api.post("/events", data);
      router.push("/dashboard");
    } catch {
      alert("Gagal membuat event");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Buat Event Baru</h1>
      <input {...register("title", { required: true })} placeholder="Judul Event" />
      {errors.title && <span>Judul wajib diisi</span>}
      <textarea {...register("description", { required: true })} placeholder="Deskripsi"></textarea>
      {errors.description && <span>Deskripsi wajib diisi</span>}
      <input {...register("date", { required: true })} type="datetime-local" />
      {errors.date && <span>Tanggal wajib diisi</span>}
      <button type="submit">Simpan</button>
    </form>
  );
};

export default CreateEvent;
