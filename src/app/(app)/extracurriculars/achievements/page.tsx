
"use client"
import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getAchievements, getStudentById, type Achievement } from "@/app/lib/data"
import { Badge } from "@/components/ui/badge"

export default function AchievementsPage() {
    const [achievements, setAchievements] = React.useState(getAchievements())

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Achievements & Awards</CardTitle>
        <CardDescription>
          Log and track student achievements and awards.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Achievement</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {achievements.map(achievement => {
                    const student = getStudentById(achievement.studentId)
                    return (
                        <TableRow key={achievement.achievementId}>
                            <TableCell className="font-medium">{student?.name}</TableCell>
                            <TableCell>{achievement.achievement}</TableCell>
                            <TableCell>{new Date(achievement.date).toLocaleDateString()}</TableCell>
                            <TableCell>
                                <Badge variant="secondary">{achievement.category}</Badge>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
