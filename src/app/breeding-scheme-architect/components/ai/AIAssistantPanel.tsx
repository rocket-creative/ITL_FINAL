'use client';

/**
 * AI Assistant Panel - Chat interface for breeding scheme assistance
 */

import { useState, useRef, useEffect } from 'react';
import { useAIAccess } from './AIAccessGate';
import { Allele, TargetGenotype } from '../lib/types';
import {
  IconDNA,
  IconArrowRight,
  IconMessageCircle,
  IconZap,
} from '@/components/UXUIDC/Icons';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  suggestions?: AIsuggestion[];
  timestamp: Date;
}

interface AIsuggestion {
  type: 'allele' | 'strategy' | 'warning' | 'cre-line';
  title: string;
  description: string;
  action?: () => void;
  actionLabel?: string;
}

interface AIAssistantPanelProps {
  alleles: Allele[];
  targetGenotypes: TargetGenotype[];
  onAddAllele: (allele: Omit<Allele, 'id'>) => void;
  onApplySuggestions?: (suggestions: AIsuggestion[]) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

// Simulated AI responses (in production, this would call an API)
function generateAIResponse(
  message: string,
  alleles: Allele[],
  _targetGenotypes: TargetGenotype[]
): { content: string; suggestions: AIsuggestion[] } {
  const lowerMessage = message.toLowerCase();

  // Detect intent and generate response
  if (lowerMessage.includes('conditional knockout') || lowerMessage.includes('cre')) {
    const tissueMatch = lowerMessage.match(/in\s+(\w+)/);
    const tissue = tissueMatch ? tissueMatch[1] : 'target tissue';

    return {
      content: `For a conditional knockout in ${tissue}, I recommend using the Cre-LoxP system. Here's what you'll need:

1. **Floxed allele**: Your target gene flanked by LoxP sites
2. **Cre driver**: A tissue-specific Cre recombinase line

The Cre will delete the floxed exon(s) only in cells where it's expressed, giving you tissue-specific knockout.`,
      suggestions: [
        {
          type: 'allele',
          title: 'Add Floxed Allele',
          description: 'Conditional knockout allele with LoxP sites flanking critical exon(s)',
          actionLabel: 'Add to scheme',
        },
        {
          type: 'cre-line',
          title: `Cre Line for ${tissue}`,
          description: `Recommend Cre driver line for ${tissue}-specific deletion`,
          actionLabel: 'View options',
        },
      ],
    };
  }

  if (lowerMessage.includes('cre line') || lowerMessage.includes('cre driver') || lowerMessage.includes('tissue specific')) {
    return {
      content: `Here are some commonly used Cre driver lines by tissue:

**Nervous System:**
• Nestin-Cre - Neural progenitors
• Syn1-Cre - Post-mitotic neurons
• CamKIIα-Cre - Forebrain excitatory neurons
• GFAP-Cre - Astrocytes

**Immune System:**
• LysM-Cre - Macrophages, neutrophils
• CD4-Cre - T cells
• CD19-Cre - B cells
• Vav-Cre - All hematopoietic cells

**Other Common Lines:**
• Albumin-Cre - Hepatocytes
• K14-Cre - Skin epithelium
• Col2a1-Cre - Chondrocytes

For inducible control, consider CreERT2 versions that require tamoxifen activation.`,
      suggestions: [
        {
          type: 'cre-line',
          title: 'LysM-Cre (Macrophages)',
          description: 'Constitutive Cre in myeloid cells, ~90% efficiency',
          actionLabel: 'Add to scheme',
        },
        {
          type: 'cre-line',
          title: 'Syn1-Cre (Neurons)',
          description: 'Pan-neuronal expression in post-mitotic neurons',
          actionLabel: 'Add to scheme',
        },
        {
          type: 'cre-line',
          title: 'Albumin-Cre (Liver)',
          description: 'Hepatocyte-specific, postnatal expression',
          actionLabel: 'Add to scheme',
        },
      ],
    };
  }

  if (lowerMessage.includes('breeding strategy') || lowerMessage.includes('optimize')) {
    const hasFloxed = alleles.some(a => a.alleleType === 'conditional-knockout');
    const hasCre = alleles.some(a => a.alleleType.includes('cre'));

    if (hasFloxed && !hasCre) {
      return {
        content: `I see you have a floxed allele but no Cre driver yet. For efficient breeding:

**Recommended Strategy:**
1. First, intercross your floxed heterozygotes to establish a homozygous floxed line
2. Then cross the floxed/floxed mice with your chosen Cre driver

This approach ensures all experimental mice have complete gene deletion in Cre-expressing cells.`,
        suggestions: [
          {
            type: 'strategy',
            title: 'Fix Floxed Allele First',
            description: 'Recommended: Establish fl/fl line before introducing Cre',
            actionLabel: 'Apply strategy',
          },
          {
            type: 'allele',
            title: 'Add Cre Driver',
            description: 'Select a tissue-specific Cre line for your research',
            actionLabel: 'Choose Cre',
          },
        ],
      };
    }

    return {
      content: `Based on your current alleles, here are some breeding strategy recommendations:

• **Minimize generations**: Fix recessive alleles to homozygosity early
• **Introduce Cre last**: This prevents unwanted deletion during breeding
• **Maintain breeding stock**: Keep homozygous floxed mice without Cre as your main colony

Would you like me to analyze your specific allele combination?`,
      suggestions: [],
    };
  }

  if (lowerMessage.includes('knockout') && !lowerMessage.includes('conditional')) {
    return {
      content: `For a conventional (constitutive) knockout:

**Approach**: Complete gene inactivation in all cells from conception

**When to use**:
• Gene is not essential for development
• You need systemic gene deletion
• Studying genes with well-defined phenotypes

**Breeding**:
• Heterozygous × Heterozygous cross
• 25% homozygous knockout (your experimental)
• 50% heterozygous (breeders)
• 25% wild-type (controls)

If homozygous knockouts are embryonic lethal, consider conditional knockout instead.`,
      suggestions: [
        {
          type: 'allele',
          title: 'Add Knockout Allele',
          description: 'Conventional null allele with complete gene disruption',
          actionLabel: 'Add to scheme',
        },
      ],
    };
  }

  // Default helpful response
  return {
    content: `I can help you with:

• **Conditional knockouts** - Planning Cre-LoxP based models
• **Cre line selection** - Finding the right tissue-specific Cre
• **Breeding optimization** - Minimizing generations and mice needed
• **Strategy recommendations** - Best approaches for your research goals
• **Troubleshooting** - Why ratios might differ from expected

What would you like to know about your breeding scheme?`,
    suggestions: [
      {
        type: 'strategy',
        title: 'Optimize My Scheme',
        description: 'Get recommendations based on your current alleles',
        actionLabel: 'Analyze',
      },
      {
        type: 'cre-line',
        title: 'Find Cre Lines',
        description: 'Browse tissue-specific Cre driver options',
        actionLabel: 'Browse',
      },
    ],
  };
}

export default function AIAssistantPanel({
  alleles,
  targetGenotypes,
  onAddAllele,
  isCollapsed,
  onToggleCollapse,
}: AIAssistantPanelProps) {
  const { queriesRemaining, consumeQuery } = useAIAccess();
  // Initialize with welcome message using lazy initialization
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I'm your AI breeding assistant. I can help you:

• Plan complex multi-allele breeding schemes
• Recommend tissue-specific Cre driver lines
• Optimize your breeding strategy
• Troubleshoot unexpected results

What would you like help with today?`,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Consume a query (may show consultation prompt, but won't block unless at limit)
    if (!consumeQuery()) {
      return; // At daily limit
    }

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = generateAIResponse(currentInput, alleles, targetGenotypes);
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.content,
        suggestions: response.suggestions,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSuggestionClick = (suggestion: AIsuggestion) => {
    if (!consumeQuery()) return; // At daily limit

    // Handle different suggestion types
    if (suggestion.type === 'allele' && suggestion.title.includes('Floxed')) {
      onAddAllele({
        geneName: 'YourGene',
        alleleType: 'conditional-knockout',
        startingGenotype: 'heterozygous',
      });
    } else if (suggestion.type === 'cre-line') {
      if (suggestion.title.includes('LysM')) {
        onAddAllele({
          geneName: 'LysM-Cre',
          alleleType: 'cre-constitutive',
          startingGenotype: 'hemizygous',
        });
      } else if (suggestion.title.includes('Syn1')) {
        onAddAllele({
          geneName: 'Syn1-Cre',
          alleleType: 'cre-constitutive',
          startingGenotype: 'hemizygous',
        });
      } else if (suggestion.title.includes('Albumin')) {
        onAddAllele({
          geneName: 'Alb-Cre',
          alleleType: 'cre-constitutive',
          startingGenotype: 'hemizygous',
        });
      }
    }

    // Send a follow-up message
    setInputValue(`Tell me more about ${suggestion.title}`);
  };

  // Quick prompts for common questions
  const quickPrompts = [
    'How do I set up a conditional knockout?',
    'What Cre lines are available for liver?',
    'Optimize my breeding strategy',
    'Why are my ratios off?',
  ];

  if (isCollapsed) {
    return (
      <button
        onClick={onToggleCollapse}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#008080',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0,128,128,0.4)',
          transition: 'all 0.3s',
          zIndex: 1000,
        }}
        className="hover:scale-110"
        aria-label="Open AI Assistant"
      >
        <IconMessageCircle size={28} color="white" />
        {queriesRemaining > 0 && queriesRemaining < 15 && (
          <div
            style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              backgroundColor: '#00d4d4',
              color: '#0a253c',
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              fontSize: '.7rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {queriesRemaining}
          </div>
        )}
      </button>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '380px',
        maxHeight: '600px',
        backgroundColor: 'white',
        border: '1px solid #e0e0e0',
        boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0a253c 0%, #008080 100%)',
          padding: '15px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              backgroundColor: 'rgba(255,255,255,0.15)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconDNA size={20} color="#00d4d4" />
          </div>
          <div>
            <div
              style={{
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '.9rem',
                fontWeight: 600,
              }}
            >
              AI Breeding Assistant
            </div>
            <div
              style={{
                color: 'rgba(255,255,255,0.7)',
                fontFamily: 'var(--system-ui)',
                fontSize: '.7rem',
              }}
            >
              Free Tool • {queriesRemaining} queries remaining today
            </div>
          </div>
        </div>
        <button
          onClick={onToggleCollapse}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'rgba(255,255,255,0.7)',
            fontSize: '1.2rem',
            padding: '5px',
          }}
          aria-label="Minimize"
        >
          −
        </button>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          padding: '15px',
          backgroundColor: '#f7f7f7',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {messages.map((message) => (
          <div key={message.id}>
            <div
              style={{
                display: 'flex',
                justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={{
                  maxWidth: '85%',
                  backgroundColor: message.role === 'user' ? '#008080' : 'white',
                  color: message.role === 'user' ? 'white' : '#333',
                  padding: '12px 15px',
                  borderRadius: message.role === 'user' ? '15px 15px 0 15px' : '15px 15px 15px 0',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.85rem',
                  lineHeight: '1.5',
                  whiteSpace: 'pre-wrap',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }}
              >
                {message.content}
              </div>
            </div>

            {/* Suggestions */}
            {message.suggestions && message.suggestions.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginTop: '10px',
                }}
              >
                {message.suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: 'white',
                      border: '1px solid #e0e0e0',
                      padding: '8px 12px',
                      cursor: 'pointer',
                      fontFamily: 'var(--system-ui)',
                      fontSize: '.75rem',
                      color: '#333',
                      transition: 'all 0.3s',
                    }}
                    className="hover:border-[#008080] hover:bg-[#f0fafa]"
                  >
                    <IconZap size={12} color="#008080" />
                    {suggestion.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                backgroundColor: 'white',
                padding: '12px 15px',
                borderRadius: '15px 15px 15px 0',
                display: 'flex',
                gap: '4px',
              }}
            >
              <span className="typing-dot" style={{ animationDelay: '0ms' }} />
              <span className="typing-dot" style={{ animationDelay: '150ms' }} />
              <span className="typing-dot" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts (when no messages or few messages) */}
      {messages.length <= 1 && (
        <div
          style={{
            padding: '10px 15px',
            borderTop: '1px solid #e0e0e0',
            backgroundColor: 'white',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--system-ui)',
              fontSize: '.7rem',
              color: '#999',
              marginBottom: '8px',
            }}
          >
            Quick questions:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {quickPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => {
                  setInputValue(prompt);
                  inputRef.current?.focus();
                }}
                style={{
                  backgroundColor: '#f7f7f7',
                  border: '1px solid #e0e0e0',
                  padding: '6px 10px',
                  cursor: 'pointer',
                  fontFamily: 'var(--system-ui)',
                  fontSize: '.7rem',
                  color: '#666',
                  transition: 'all 0.3s',
                }}
                className="hover:bg-[#e0e0e0]"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div
        style={{
          padding: '15px',
          borderTop: '1px solid #e0e0e0',
          backgroundColor: 'white',
          display: 'flex',
          gap: '10px',
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder="Ask about breeding schemes..."
          style={{
            flex: 1,
            padding: '10px 15px',
            border: '1px solid #e0e0e0',
            borderRadius: '20px',
            fontFamily: 'var(--system-ui)',
            fontSize: '.85rem',
            outline: 'none',
          }}
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || isTyping}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: inputValue.trim() && !isTyping ? '#008080' : '#ccc',
            border: 'none',
            cursor: inputValue.trim() && !isTyping ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s',
          }}
        >
          <IconArrowRight size={18} color="white" />
        </button>
      </div>

      {/* Typing animation styles */}
      <style jsx global>{`
        .typing-dot {
          width: 8px;
          height: 8px;
          background-color: #008080;
          border-radius: 50%;
          animation: typing 1s infinite;
        }

        @keyframes typing {
          0%,
          60%,
          100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          30% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
