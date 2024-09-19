import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Page() {
  return (
    <Card className='bg-card/60 backdrop-blur'>
      <CardHeader>
        <CardTitle>Előfizetésem</CardTitle>
        <CardDescription>Az előfizetéseddel kapcsolatos adatokat kezelheted itt</CardDescription>
      </CardHeader>
      <CardContent>INFO</CardContent>
    </Card>
  )
}
