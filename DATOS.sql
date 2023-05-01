SELECT iSkillsetStat.Timestamp, iSkillsetStat.Skillset, iSkillsetStat.CallsAnswered, iSkillsetStat.CallsAnsweredAfterThreshold, iSkillsetStat.CallsOffered, iSkillsetStat.SkillsetAbandoned, iSkillsetStat.TalkTime
FROM dbo.iSkillsetStat iSkillsetStat
WHERE (iSkillsetStat.Timestamp>={ts '${fi}'} And iSkillsetStat.Timestamp<={ts '${ff}'}) AND (iSkillsetStat.CallsOffered>0)
ORDER BY iSkillsetStat.Skillset

SELECT iSkillsetStat.Timestamp, iSkillsetStat.Skillset, iSkillsetStat.CallsAnswered, iSkillsetStat.CallsAnsweredAfterThreshold, iSkillsetStat.CallsOffered, iSkillsetStat.SkillsetAbandoned, iSkillsetStat.SkillsetAbandonedAftThreshold, iSkillsetStat.TalkTime
FROM dbo.iSkillsetStat iSkillsetStat
WHERE (iSkillsetStat.Timestamp>={ts '${fi}'} And iSkillsetStat.Timestamp<={ts '${ff}'}) AND (iSkillsetStat.CallsOffered>0)
ORDER BY iSkillsetStat.Skillset


/* sskil*/

SELECT dSkillsetStat.Timestamp, dSkillsetStat.Skillset, dSkillsetStat.CallsAnswered, dSkillsetStat.CallsAnsweredAfterThreshold, dSkillsetStat.CallsOffered, dSkillsetStat.SkillsetAbandoned, dSkillsetStat.TalkTime
FROM dbo.dSkillsetStat dSkillsetStat
WHERE (dSkillsetStat.Timestamp={ts '${fi}'}) AND (dSkillsetStat.CallsOffered>0)
ORDER BY dSkillsetStat.Skillset

SELECT dSkillsetStat.Timestamp, dSkillsetStat.Skillset, dSkillsetStat.CallsAnswered, dSkillsetStat.CallsAnsweredAfterThreshold, dSkillsetStat.CallsOffered, dSkillsetStat.SkillsetAbandoned, dSkillsetStat.SkillsetAbandonedAftThreshold, dSkillsetStat.TalkTime
FROM dbo.dSkillsetStat dSkillsetStat
WHERE (dSkillsetStat.Timestamp={ts '${fi}'}) AND (dSkillsetStat.CallsOffered>0)
ORDER BY dSkillsetStat.Skillset