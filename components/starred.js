import createPersistedState from 'use-persisted-state';
const useStarredState = createPersistedState('starred');

const useStarred = () => {
  const [starred, setStarred] = useStarredState([]);

  return {
    starred,
    updateStarred: (opportunityId) => {
        starred.includes(opportunityId)
        ? setStarred(starred.filter(oid => oid != opportunityId))
        : setStarred(prev => [...prev, opportunityId]);
    }
  };
};

export default useStarred;