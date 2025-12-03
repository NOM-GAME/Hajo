"use client"

import { RotationalForm } from "@/components/create-group/rotational-form"
import { Card } from "@/components/ui/card"

export function CreateGroup() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Create a Savings Group</h2>
        <p className="text-muted-foreground mt-1">Traditional ajo/esusu system where members take turns receiving payouts</p>
      </div>

      <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border shadow-lg">
        <RotationalForm />
      </Card>
    </div>
  )
}
