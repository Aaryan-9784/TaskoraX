import { useAuth } from '../../context/AuthContext';

const SkillsExpertise = () => {
  const { user } = useAuth();
  
  // Since skills is just an array of strings in the backend, we map them to a uniform visual style
  const colors = ['bg-cyan-500', 'bg-green-500', 'bg-purple-500', 'bg-primary-500', 'bg-sky-500'];
  const userSkills = (user?.skills || []).map((skill, index) => ({
    name: skill,
    level: 'Intermediate',
    percentage: 75,
    color: colors[index % colors.length]
  }));

  return (
    <div className="bg-white border border-border/50 rounded-2xl overflow-hidden shadow-sm h-full">
      <div className="px-6 py-5 border-b border-border/50 bg-surface-secondary/30 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-text-primary">Skills & Expertise</h3>
        <button className="text-xs font-medium text-primary-600 hover:text-primary-700">Add Skill</button>
      </div>
      <div className="p-6">
        <div className="space-y-5">
          {userSkills.length === 0 && <div className="text-sm text-text-secondary text-center py-4">No skills added yet.</div>}
          {userSkills.map((skill) => (
            <div key={skill.name}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-medium text-text-secondary">{skill.name}</span>
                <span className="text-xs text-text-tertiary">{skill.level}</span>
              </div>
              <div className="w-full h-2 bg-surface-secondary rounded-full overflow-hidden">
                <div 
                  className={`h-full ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${skill.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex flex-wrap gap-2">
          {['JavaScript', 'TypeScript', 'Figma', 'Git', 'Agile'].map(tag => (
            <span key={tag} className="px-3 py-1 bg-surface-secondary text-text-secondary text-xs font-medium rounded-full border border-border/50 hover:bg-surface-secondary/80 cursor-pointer transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsExpertise;
