import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle } from "lucide-react";

interface QuizQuestion {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
}

interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

interface QuizViewerProps {
  quiz: Quiz | null;
}

export const QuizViewer = ({ quiz }: QuizViewerProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          No quiz available yet
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: value,
    });
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct_answer) {
        correct++;
      }
    });
    return correct;
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / quiz.questions.length) * 100);

    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz Results</CardTitle>
          <CardDescription>
            You scored {score} out of {quiz.questions.length} ({percentage}%)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {quiz.questions.map((q, index) => {
            const userAnswer = selectedAnswers[q.id];
            const isCorrect = userAnswer === q.correct_answer;

            return (
              <Card key={q.id} className={isCorrect ? "border-green-500" : "border-red-500"}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-2 mb-2">
                    {isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium mb-2">
                        {index + 1}. {q.question}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Your answer: <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                          {userAnswer ? q[`option_${userAnswer}` as keyof QuizQuestion] : "Not answered"}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-600">
                          Correct answer: {q[`option_${q.correct_answer}` as keyof QuizQuestion]}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          <Button onClick={handleRestart} className="w-full">
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{quiz.title}</CardTitle>
        <CardDescription>
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <p className="font-medium mb-4">{currentQuestion.question}</p>
          <RadioGroup
            value={selectedAnswers[currentQuestion.id] || ""}
            onValueChange={handleAnswerSelect}
          >
            {["a", "b", "c", "d"].map((option) => (
              <div key={option} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-accent">
                <RadioGroupItem value={option} id={`${currentQuestion.id}-${option}`} />
                <Label 
                  htmlFor={`${currentQuestion.id}-${option}`}
                  className="flex-1 cursor-pointer"
                >
                  {currentQuestion[`option_${option}` as keyof QuizQuestion]}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!selectedAnswers[currentQuestion.id]}
          >
            {isLastQuestion ? "Finish Quiz" : "Next"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};