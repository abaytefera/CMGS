import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from "react-redux";
import { 
  faPaperPlane, 
  faMagnifyingGlass, 
  faSpinner, 
  faCheckCircle 
} from '@fortawesome/free-solid-svg-icons';

const StatusHistory = () => {
  const { Language } = useSelector((state) => state.webState);

 
  const steps = [
    { 
      label: Language === "AMH" ? "ተልኳል" : "Submitted", 
      icon: faPaperPlane, 
      color: 'text-blue-500', 
      bg: 'bg-blue-100' 
    },
    { 
      label: Language === "AMH" ? "በምርመራ ላይ" : "Under Review", 
      icon: faMagnifyingGlass, 
      color: 'text-amber-500', 
      bg: 'bg-amber-100' 
    },
    { 
      label: Language === "AMH" ? "በሂደት ላይ" : "In Progress", 
      icon: faSpinner, 
      color: 'text-purple-500', 
      bg: 'bg-purple-100' 
    },
    { 
      label: Language === "AMH" ? "ተፈትቷል" : "Resolved", 
      icon: faCheckCircle, 
      color: 'text-green-600', 
      bg: 'bg-green-100' 
    },
  ];

  const currentStep = 3; 

  return (
    <div className="mb-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-800 mb-10 flex items-center gap-2">
        <span className="w-2 h-6 bg-green-500 rounded-full"></span>
        {Language === "AMH" ? "የሂደት ታሪክ" : "Status & History"}
      </h3>

      <div className="relative flex justify-between">
   
        <div className="absolute top-5 left-0 w-full h-1 bg-gray-100 -z-0 rounded-full" />
        
       
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute top-5 left-0 h-1 bg-green-500 z-0 rounded-full"
        />

        {steps.map((step, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="relative z-10 flex flex-col items-center group"
          >
         
            <motion.div 
              whileHover={{ scale: 1.2 }}
              className={`w-11 h-11 rounded-full ${index <= currentStep ? step.bg : 'bg-gray-100'} 
              flex items-center justify-center border-4 border-white shadow-md transition-colors duration-500`}
            >
              <FontAwesomeIcon 
                icon={step.icon} 
                className={`${index <= currentStep ? step.color : 'text-gray-400'} text-sm 
                ${step.label === (Language === "AMH" ? "በሂደት ላይ" : 'In Progress') && index === currentStep ? 'fa-spin' : ''}`} 
              />
            </motion.div>

          
            <span className={`mt-3 text-[11px] md:text-xs font-bold tracking-tight
              ${index <= currentStep ? 'text-gray-800' : 'text-gray-400'}
              ${index === currentStep ? 'text-green-600' : ''}`}>
              {step.label}
            </span>
            
           
            {index === currentStep && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StatusHistory;