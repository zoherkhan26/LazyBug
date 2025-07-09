import {
  create
} from "zustand";
import {
  persist
} from "zustand/middleware";

const useProjectStore = create(
  persist(
      (set, get) => ({
          projects: [{
              name: "zherproj",
              description: "a",
              id: 21,
              features: [],
              visuals: []
          }, ],

          addProject: (project) =>
              set((state) => ({
                  projects: [
                      ...state.projects,
                      {
                          ...project,
                          features: [],
                          visuals: [],
                          techs: [],
                          milestones: []
                      },
                  ],
              })),

          removeProject: (projectId) =>
              set((state) => ({
                  projects: state.projects.filter((proj) => proj.id !== projectId),
              })),

          updateProject: (projectId, updatedData) =>
              set((state) => ({
                  projects: state.projects.map((proj) =>
                      proj.id === projectId ? {
                          ...proj,
                          ...updatedData
                      } : proj
                  ),
              })),

          addFeature: (projectId, feature) =>
              set((state) => ({
                  projects: state.projects.map((proj) =>
                      proj.id === projectId ?
                      {
                          ...proj,
                          features: [...proj.features, feature],
                      } :
                      proj
                  ),
              })),

          updateFeature: (projectId, featureId, updatedFeature) =>
              set((state) => ({
                  projects: state.projects.map((proj) =>
                      proj.id === projectId ?
                      {
                          ...proj,
                          features: proj.features.map((feat) =>
                              feat.id === featureId ? {
                                  ...feat,
                                  ...updatedFeature
                              } : feat
                          ),
                      } :
                      proj
                  ),
              })),

          removeFeature: (projectId, featureId) =>
              set((state) => ({
                  projects: state.projects.map((proj) =>
                      proj.id === projectId ?
                      {
                          ...proj,
                          features: proj.features.filter(
                              (feat) => feat.id !== featureId
                          ),
                      } :
                      proj
                  ),
              })),

          toggleFeatureCompletion: (projectId, featureId) => {
              const project = get().projects.find(p => p.id === projectId);
              if (!project) return;

              const updatedFeatures = project.features.map(f => {
                  if (f.id === featureId) {
                      const nowCompleted = !f.completed;
                      return {
                          ...f,
                          completed: nowCompleted,
                          completedAt: nowCompleted ? Date.now() : null,
                      };
                  }
                  return f;
              });

              project.features = updatedFeatures;
              set({
                  projects: [...get().projects]
              });
          },

          addVisual: (projectId, imageUrl) =>
              set((state) => ({
                  projects: state.projects.map((proj) =>
                      proj.id === projectId ?
                      {
                          ...proj,
                          visuals: [...proj.visuals, imageUrl],
                      } :
                      proj
                  ),
              })),

          removeVisual: (projectId, imageUrl) =>
              set((state) => ({
                  projects: state.projects.map((proj) =>
                      proj.id === projectId ?
                      {
                          ...proj,
                          visuals: proj.visuals.filter((url) => url !== imageUrl),
                      } :
                      proj
                  ),
              })),

              addTech: (projectId, tech) => 
                set((state) => ({
                  projects: state.projects.map((project) =>
                    project.id === projectId
                      ? {
                          ...project,
                          techs: [...(project.techs || []), tech],
                        }
                      : project
                  ),
                })),   

                removeTech: (projectId, tech) => 
                    set((state) => ({
                      projects: state.projects.map((project) =>
                        project.id === projectId
                          ? {
                              ...project,
                              techs: (project.techs || []).filter((t) => t !== tech),
                            }
                          : project
                      ),
                    })),

                    addMilestone: (projectId, milestone) =>
                        set((state) => {
                          const project = state.projects.find((p) => p.id === projectId);
                      
                          // Prevent if title already exists
                          const isDuplicate = project?.milestones?.some(
                            (m) => m.title.toLowerCase().trim() === milestone.title.toLowerCase().trim()
                          );
                      
                          if (isDuplicate) {
                            alert("A milestone with the same title already exists."); // or return a message
                            return state; // return current state, no change
                          }
                      
                          return {
                            projects: state.projects.map((project) =>
                              project.id === projectId
                                ? {
                                    ...project,
                                    milestones: [...(project.milestones || []), milestone],
                                  }
                                : project
                            ),
                          };
                        }),

                     updateMilestone: (projectId, milestoneId, updatedData) =>
                            set((state) => ({
                              projects: state.projects.map((project) =>
                                project.id === projectId
                                  ? {
                                      ...project,
                                      milestones: project.milestones.map((m) =>
                                        m.id === milestoneId ? { ...m, ...updatedData } : m
                                      ),
                                    }
                                  : project
                              ),
                            })),
                            
                            deleteMilestone: (projectId, milestoneId) =>
                                set((state) => ({
                                  projects: state.projects.map((project) =>
                                    project.id === projectId
                                      ? {
                                          ...project,
                                          milestones: project.milestones.filter(
                                            (m) => m.id !== milestoneId
                                          ),
                                        }
                                      : project
                                  ),
                                })),
                              
                          

      }), {
          name: "project-storage",
      }
  )
);

export default useProjectStore;