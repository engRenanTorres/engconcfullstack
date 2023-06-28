/* eslint-disable import/no-cycle */
import QuestionLayout from '../../components/layout/QuestionLayout';
import ListQuestionContent from '../../containers/questions/ListQuestion';

function ListQuestions() {
  return (
    <QuestionLayout>
      <ListQuestionContent />
    </QuestionLayout>
  );
}

export default ListQuestions;
