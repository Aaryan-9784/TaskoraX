const MOCK_SKILLS = [
  { name: 'React.js', level: 'Expert', percentage: 95, color: 'bg-cyan-500' },
  { name: 'Node.js', level: 'Advanced', percentage: 85, color: 'bg-green-500' },
  { name: 'UI/UX Design', level: 'Intermediate', percentage: 65, color: 'bg-purple-500' },
  { name: 'Project Management', level: 'Advanced', percentage: 80, color: 'bg-primary-500' },
  { name: 'TailwindCSS', level: 'Expert', percentage: 90, color: 'bg-sky-500' },
];

const SkillsExpertise = () => {
  return (
    <div className="bg-white border border-border/50 rounded-2xl overflow-hidden shadow-sm h-full">
      <div className="px-6 py-5 border-b border-border/50 bg-surface-secondary/30 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-text-primary">Skills & Expertise</h3>
        <button className="text-xs font-medium text-primary-600 hover:text-primary-700">Add Skill</button>
      </div>
      <div className="p-6">
        <div className="space-y-5">
          {MOCK_SKILLS.map((skill) => (
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
