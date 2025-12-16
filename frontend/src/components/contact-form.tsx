import { useState } from "react";
import { ArrowRight, Briefcase, Check, Monitor, Send, Smartphone, Zap, type LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { BrutalButton } from "./button";

interface FormData {
  name: string;
  email: string;
  type: string;
  budget: string;
  message: string;
}

const PROJECT_TYPES = [
  { id: "web", label: "Web App", icon: Monitor },
  { id: "mobile", label: "Mobile App", icon: Smartphone },
  { id: "corp", label: "Sistema Corp", icon: Briefcase },
  { id: "other", label: "Outro", icon: Zap },
] as const;

const BUDGET_OPTIONS = ["< 500k", "500k - 2M", "2M - 5M", "> 5M"] as const;

const BrutalInput = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  multiline = false,
  error,
}: {
  id: string;
  label?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  multiline?: boolean;
  error?: string;
}) => (
  <div className="flex flex-col gap-2">
    {label && (
      <label htmlFor={id} className="font-mono text-xs uppercase font-black tracking-widest text-black">
        {label}
      </label>
    )}
    {multiline ? (
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={5}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className="w-full bg-white border-4 border-black p-5 font-bold text-black placeholder:text-gray-400 focus:outline-none focus:bg-[#CCFF00] focus:shadow-[8px_8px_0px_0px_black] transition-all resize-none rounded-none"
      />
    ) : (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className="w-full bg-white border-4 border-black p-5 font-bold text-black placeholder:text-gray-400 focus:outline-none focus:bg-[#CCFF00] focus:shadow-[8px_8px_0px_0px_black] transition-all rounded-none"
      />
    )}
    {error && (
      <p id={`${id}-error`} className="text-xs font-bold uppercase text-red-600 mt-1">
        {error}
      </p>
    )}
  </div>
);

const SelectChip = ({
  label,
  icon: Icon,
  selected,
  onClick,
}: {
  label: string;
  icon: LucideIcon;
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={selected}
    className={`relative flex flex-col items-center justify-center p-6 border-4 overflow-hidden transition-all duration-300 group ${
      selected
        ? "bg-black text-[#CCFF00] border-black shadow-[8px_8px_0px_0px_#CCFF00]"
        : "bg-white text-gray-500 border-gray-300 hover:border-black hover:text-black shadow-[4px_4px_0px_0px_black]"
    }`}
  >
    <div className="absolute inset-0 bg-[#FF4D00] opacity-0 group-hover:opacity-20 transition-opacity" />
    <Icon size={32} className="mb-3 z-10" />
    <span className="font-black uppercase text-sm tracking-wider z-10">{label}</span>
  </button>
);

export const EnhancedContactForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    type: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateStep2 = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório";
    if (!formData.email.trim()) newErrors.email = "Email é obrigatório";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Email inválido";
    if (formData.message.trim().length < 10)
      newErrors.message = "Descreva o desafio com pelo menos 10 caracteres";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!formData.type) {
      alert("Por favor, selecione o tipo de projeto");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1800));

    console.group("NOVO LEAD CAPTURADO - SOFTWISE");
    console.log("Tipo de Projeto:", formData.type);
    console.log("Orçamento:", formData.budget || "Não informado");
    console.log("Nome/Empresa:", formData.name);
    console.log("Email:", formData.email);
    console.log("Mensagem:", formData.message);
    console.groupEnd();

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const resetForm = () => {
    setIsSuccess(false);
    setStep(1);
    setFormData({ name: "", email: "", type: "", budget: "", message: "" });
    setErrors({});
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-8 border-black p-12 text-center shadow-[20px_20px_0px_0px_#CCFF00] max-w-2xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-32 h-32 bg-[#CCFF00] border-8 border-black rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <Check size={64} className="text-black" />
        </motion.div>
        <h2 className="text-4xl font-black uppercase mb-6">Recebido com Sucesso!</h2>
        <p className="text-lg font-bold text-gray-700 mb-10 leading-relaxed">
          A equipa Softwise já tem o teu briefing.<br />
          Vamos analisar tudo e voltamos com uma proposta brutal em breve.
        </p>
        <BrutalButton onClick={resetForm} variant="outline" >
          Enviar Novo Briefing
        </BrutalButton>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-white border-8 border-black p-8 md:p-16 shadow-[16px_16px_0px_0px_#006C93] max-w-4xl mx-auto relative overflow-hidden"
    >
      {/* Progress Bar Brutal */}
      <div className="absolute top-0 left-0 w-full h-4 bg-gray-200 border-b-4 border-black">
        <motion.div
          className="h-full bg-[#FF4D00]"
          initial={{ width: "0%" }}
          animate={{ width: step === 1 ? "50%" : "100%" }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        />
      </div>

      <div className="mt-8 mb-12">
        <span className="font-mono text-sm font-black uppercase text-gray-500">Passo 0{step} de 02</span>
        <h3 className="text-3xl md:text-5xl font-black uppercase mt-3 leading-none">
          {step === 1 ? "Qual o teu desafio?" : "Conta-nos tudo"}
        </h3>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="space-y-12"
          >
            <div>
              <p className="font-black uppercase text-sm mb-6 text-gray-600">Tipo de Projeto</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {PROJECT_TYPES.map((type) => (
                  <SelectChip
                    key={type.id}
                    label={type.label}
                    icon={type.icon}
                    selected={formData.type === type.id}
                    onClick={() => setFormData({ ...formData, type: type.id })}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="font-black uppercase text-sm mb-6 text-gray-600">Orçamento Estimado (AKZ)</p>
              <div className="flex flex-wrap gap-4">
                {BUDGET_OPTIONS.map((budget) => (
                  <button
                    key={budget}
                    type="button"
                    onClick={() => setFormData({ ...formData, budget })}
                    className={`px-6 py-4 border-4 font-black uppercase text-sm tracking-wider transition-all ${
                      formData.budget === budget
                        ? "bg-[#CCFF00] border-black shadow-[8px_8px_0px_black] text-black"
                        : "bg-white border-gray-400 text-gray-500 hover:border-black hover:text-black"
                    }`}
                  >
                    {budget}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <BrutalButton onClick={handleNext} icon={ArrowRight} >
                Próximo Passo
              </BrutalButton>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="space-y-8"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <BrutalInput
                id="name"
                label="Nome ou Empresa"
                placeholder="Ex: João Silva"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={errors.name}
              />
              <BrutalInput
                id="email"
                label="Email Corporativo"
                type="email"
                placeholder="joao@empresa.ao"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={errors.email}
              />
            </div>

            <BrutalInput
              id="message"
              label="Descrição do Desafio"
              placeholder="Descreve o que precisas com o máximo de detalhe possível..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              multiline
              error={errors.message}
            />

            <div className="flex justify-between items-center pt-8">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="font-black uppercase text-sm underline underline-offset-8 hover:no-underline transition-all"
              >
                ← Voltar
              </button>

              <BrutalButton
                type="submit"
                variant="primary"
                icon={isSubmitting ? undefined : Send}
                disabled={isSubmitting}
                
              >
                {isSubmitting ? "A ENVIAR..." : "ENVIAR BRIEFING"}
              </BrutalButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
};