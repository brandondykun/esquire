import { useParams } from "react-router-dom";
import useCase from "../hooks/useCase";
import useClient from "../hooks/useClient";

const CaseDetailsPage = () => {
  const { clientId, caseId } = useParams();

  const { loading, caseInfo, error } = useCase(caseId);
  const { nameLoading, clientName, nameError } = useClient(clientId);

  return (
    <div className="page-container">
      <div className="case-details-page-container">
        <h1 className="case-details-page-title">CASE DETAILS</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {!nameLoading && (
              <div>
                {clientName?.firstName} {clientName?.lastName}
              </div>
            )}
            <div>{caseInfo?.name}</div>
            <div>{caseInfo?.caseNumber}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseDetailsPage;
