import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RotateCw } from "lucide-react";
import { motion } from "framer-motion";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

interface FlashcardViewerProps {
  flashcards: Flashcard[];
}

export const FlashcardViewer = ({ flashcards }: FlashcardViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!flashcards || flashcards.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          No flashcards available yet
        </CardContent>
      </Card>
    );
  }

  const currentCard = flashcards[currentIndex];

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          Flashcard {currentIndex + 1} of {flashcards.length}
        </h3>
      </div>

      <div 
        className="perspective-1000 cursor-pointer"
        onClick={handleFlip}
      >
        <motion.div
          className="relative w-full h-64"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front of card (Question) */}
          <Card 
            className="absolute w-full h-full backface-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            <CardContent className="flex flex-col items-center justify-center h-full p-6">
              <p className="text-xs text-muted-foreground mb-2">QUESTION</p>
              <p className="text-lg text-center">{currentCard.question}</p>
              <p className="text-xs text-muted-foreground mt-4">Click to flip</p>
            </CardContent>
          </Card>

          {/* Back of card (Answer) */}
          <Card 
            className="absolute w-full h-full backface-hidden"
            style={{ 
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)"
            }}
          >
            <CardContent className="flex flex-col items-center justify-center h-full p-6 bg-primary/5">
              <p className="text-xs text-muted-foreground mb-2">ANSWER</p>
              <p className="text-lg text-center">{currentCard.answer}</p>
              <p className="text-xs text-muted-foreground mt-4">Click to flip back</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <Button
          variant="outline"
          onClick={handleFlip}
        >
          <RotateCw className="h-4 w-4 mr-2" />
          Flip
        </Button>

        <Button
          variant="outline"
          onClick={handleNext}
          disabled={currentIndex === flashcards.length - 1}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};