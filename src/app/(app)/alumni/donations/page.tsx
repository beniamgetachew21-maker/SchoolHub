
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
import { getDonations, type Donation } from "@/app/lib/data"
import { Badge } from "@/components/ui/badge"

export default function AlumniDonationsPage() {
    const [donations, setDonations] = React.useState(getDonations())

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Alumni Donations</CardTitle>
        <CardDescription>
          Track and manage fundraising campaigns and donations from alumni.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Donation ID</TableHead>
                    <TableHead>Donor Name</TableHead>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {donations.map(donation => (
                    <TableRow key={donation.donationId}>
                        <TableCell className="font-mono">{donation.donationId}</TableCell>
                        <TableCell className="font-medium">{donation.donorName}</TableCell>
                        <TableCell>
                            <Badge variant="secondary">{donation.campaign}</Badge>
                        </TableCell>
                        <TableCell>{new Date(donation.date).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right font-mono">{formatCurrency(donation.amount)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
