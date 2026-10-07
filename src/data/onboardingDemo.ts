export const onboardingSteps = ['Documents received', 'Contract signed', 'Equipment ready', 'Orientation complete'] as const;
export const onboardingSample = [
 {id:'E001',department:'Engineering',start:'2026-10-01',due:'2026-10-05',done:[true,true,false,false]},
 {id:'E002',department:'Operations',start:'2026-10-02',due:'2026-10-06',done:[true,true,true,false]},
 {id:'E003',department:'Sales',start:'2026-10-05',due:'2026-10-09',done:[true,false,false,false]},
 {id:'E004',department:'People',start:'2026-10-06',due:'2026-10-10',done:[true,true,true,true]},
 {id:'E005',department:'Engineering',start:'2026-10-08',due:'2026-10-12',done:[false,false,false,false]},
 {id:'E006',department:'Operations',start:'2026-10-01',due:'2026-10-05',done:[true,true,true,true]},
];
export function onboardingSummary(rows: typeof onboardingSample, asOf: string) {
 const completedTasks=rows.reduce((s,r)=>s+r.done.filter(Boolean).length,0);
 const complete=rows.filter(r=>r.done.every(Boolean)).length;
 const overdue=rows.filter(r=>r.due < asOf && !r.done.every(Boolean)).length;
 return {complete,overdue,completedTasks,completion:rows.length?completedTasks/(rows.length*onboardingSteps.length)*100:0};
}
